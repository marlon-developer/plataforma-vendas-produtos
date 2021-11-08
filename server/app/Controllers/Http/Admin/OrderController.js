'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Order = use('App/Models/Order')
const Database = use('Database')
const Service = use('App/Services/Order/OrderService')
const Coupon = use('App/Models/Coupon')
const Discount = use('App/Models/Discount')
const Transformer = use('App/Transformers/Admin/OrderTransformer')
/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param { object } ctx.paginate
   */
  async index({ request, response, pagination, transform }) {
    const { status, id } = request.only(['status', 'id '])

    if (status && id) {
      Order.query().where('status', status).orWhere('id', 'LIKE', `%${id}%`)
    } else if (status) {
      Order.query().where('status', status)
    } else if (id) {
      Order.query().where('id', 'LIKE', `%${id}%`)
    }

    var orders = await Order.query().paginate(pagination.page, pagination.limit)
    orders = await transform.paginate(orders, Transformer)
    return response.send(orders)
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform }) {
    const transaction = await Database.beginTransaction()
    try {
      const { user_id, items, status } = request.all()
      var order = await Order.create({ user_id, status }, transaction)
      const service = new Service(order, transaction)
      if (items && items.length > 0) {
        await service.syncItems(items)
      }
      await transaction.commit()
      order = await Order.find(order.id)
      order = await transform.include('user,items').item(order, Transformer)
      return response.status(201).send(order)
    } catch (error) {
      await transaction.rollback()
      return response.status(400).send({
        message: 'Não foi possível criar o pedido no momento!'
      })
    }
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    return response.send(await transform.include('items,user,discounts').item(Order.findOrFail(id), Transformer))
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var order = await Order.findOrFail(id)
    const transaction = await Database.beginTransaction()
    try {
      const { user_id, items, status } = request.all()
      order.merge({ user_id, status })
      const service = new Service(order, transaction)
      await service.updateItems(items)
      await order.save(transaction)
      await transaction.commit()
      return response.send(await transform.include('items,user,discounts,coupons').item(order, Transformer))
    } catch (error) {
      await transaction.rollback()
      return response.status(400).send({
        message: 'Não foi possível atualizar!'
      })
    }
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const transaction = await Databse.beginTransaction()
    try {
      await Order.findOrFail(id).items().delete(transaction)
      await Order.findOrFail(id).coupons().delete(transaction)
      await Order.findOrFail(id).delete(transaction)
      await transaction.commit()
      return response.status(204).send()
    } catch (error) {
      await transaction.rollback()
      return response.status(400).send({
        message: 'Não foi possível excluir!'
      })
    }
  }

  async applyDiscount({ params: { id }, request, response, transform }) {
    const { code } = request.all()
    const coupon = await Coupon.findByOrFail('code', code.toUpperCase())
    var order = await Order.findOrFail(id)
    var discount,
      info = {}
    try {
      const service = new Service(order)
      const canAddDiscount = await service.canApplyDiscount(coupon)
      const orderDiscounts = await order.coupons().getCount()

      const cannApplyToOrder =
        orderDiscounts < 1 || (orderDiscounts >= 1 && coupon.recursive)
      if (canAddDiscount && cannApplyToOrder) {
        discount = await Discount.findOrCreate({
          order_id: order.id,
          coupon_id: coupon.id
        })
        info.message = 'Cupom aplicado com sucesso!'
        info.success = true
      } else {
        info.message = 'Não foi possível aplicar este cupom!'
        info.success = false
      }
      order = await transform
        .include('items,user,discounts,coupons')
        .item(order, Transformer)
      return response.send({ order, info })
    } catch (error) {
      return response.status(400).send({ message: 'Não foi possível aplicar o cupom!' })
    }
  }

  async removeDiscount({ request, response }) {
    const { discount_id } = request.all()
    const discount = await Discount.findOrFail(discount_id)
    await discount.delete()
    return response.status(204).send()
  }
}

module.exports = OrderController
