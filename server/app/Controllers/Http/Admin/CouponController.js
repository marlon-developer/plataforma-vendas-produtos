'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Coupon = use('App/Models/Coupon')
const Database = use('Database')
const Service = use('App/Services/Coupon/CouponService')
const Transformer = use('App/Transformers/Admin/CouponTransformer')

/**
 * Resourceful controller for interacting with coupons
 */
class CouponController {
  /**
   * Show a list of all coupons.
   * GET coupons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.pagination
   */
  async index({ request, response, pagination, transform }) {
    if (request.input('code')) {
      Coupon.query().where('code', 'LIKE', `%${request.input('code')}%`)
    }

    var coupons = await Coupon.query().paginate(pagination.page, pagination.limit)
    coupons = await transform.paginate(coupons, Transformer)
    return response.send(coupons)
  }

  /**
   * Create/save a new coupon.
   * POST coupons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform }) {
    const trx = await Database.beginTransaction()
    /**
     * 1 - produto - pode ser utilizado apenas em produtos específicos
     * 2 - clients - pode ser utilizado apenas por clientes específicos
     * 3 - clients e products - pode ser utilizado somente em produtos e clientes específicos
     * 4 - pode ser utilizado por qualquer cliente em qualque pedido
     */

    var can_use_for = {
      client: false,
      product: false
    }

    try {
      const couponData = request.only([
        'code',
        'discount',
        'valid_from',
        'valid_until',
        'quantity',
        'type',
        'recursive'
      ])

      const { users, products } = request.only(['users', 'products'])
      var coupon = await Coupon.create(couponData, trx)

      const service = new Service(coupon, trx)

      if (users && users.length > 0) {
        await service.syncUsers(users)
        can_use_for.client = true
      }

      if (products && products.length > 0) {
        await service.syncProducts(products)
        can_use_for.product = true
      }

      if (can_use_for.product && can_use_for.client) {
        coupon.can_use_for = 'product_client'
      } else if (can_use_for.product && !can_use_for.client) {
        coupon.can_use_for = 'product'
      } else if (!can_use_for.product && can_use_for.client) {
        coupon.can_use_for = 'client'
      } else {
        coupon.can_use_for = 'all'
      }

      await coupon.save(trx)
      await trx.commit()
      coupon = await transform
        .include('users,products')
        .item(coupon, Transformer)
      return response.status(201).send(coupon)
    } catch (error) {
      await trx.rollback()
      return response
        .status(400)
        .send({ message: 'Não foi possível criar o cupom no momento!' })
    }
  }

  /**
   * Display a single coupon.
   * GET coupons/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var coupon = await transform
      .include('products,users,orders')
      .item(Coupon.findOrFail(id), Transformer)
    return response.send(coupon)
  }

  /**
   * Update coupon details.
   * PUT or PATCH coupons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    const transaction = await Database.beginTransaction()
    var coupon = await Coupon.findOrFail(id)
    var can_use_for = {
      client: false,
      product: false
    }

    try {
      const couponData = request.only([
        'code',
        'discount',
        'valid_from',
        'valid_until',
        'quantity',
        'type',
        'recursive'
      ])

      coupon.merge(couponData)

      const { users, products } = request.only(['users', 'products'])

      const service = new Service(coupon, transaction)

      if (users && users.length > 0) {
        await service.syncUsers(users)
        can_use_for.client = true
      }

      if (products && products.length > 0) {
        can_use_for.product = true
      }

      if (can_use_for.product && can_use_for.client) {
        coupon.can_use_for = 'product_client'
      } else if (can_use_for.product && !can_use_for.client) {
        coupon.can_use_for = 'product'
      } else if (!can_use_for.product && can_use_for.client) {
        coupon.can_use_for = 'client'
      } else {
        coupon.can_use_for = 'all'
      }

      await coupon.save(transaction)
      await transaction.commit()
      return response.send(await transform.item(coupon, Transformer))
    } catch (error) {
      await transaction.rollback()
      return response.status(400).send({
        message: 'Não foi possível atualizar este cupom no momento!'
      })
    }
  }

  /**
   * Delete a coupon with id.
   * DELETE coupons/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    try {
      await Coupon.findOrFail(id).products().detach([], Database.beginTransaction())
      await Coupon.findOrFail(id).orders().detach([], Database.beginTransaction())
      await Coupon.findOrFail(id).users().detach([], Database.beginTransaction())
      await Coupon.findOrFail(id).delete(Database.beginTransaction())
      await Database.beginTransaction().commit()
      return response.status(204).send()
    } catch (error) {
      await Database.beginTransaction().rollback()
      return response.status(400).send({
        message: 'Não foi possível excluir!'
      })
    }
  }
}

module.exports = CouponController
