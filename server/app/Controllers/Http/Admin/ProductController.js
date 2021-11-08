'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Product = use('App/Models/Product')
const Transformer = use('App/Transformers/Admin/ProductTransformer')
/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform }) {
    if (request.input('name')) {
      Product.query().where('name', 'LIKE', `%${request.input('name')}%`)
    }

    var products = await Product.query().paginate(pagination.page, pagination.limit)
    products = await transform.paginate(products, Transformer)
    return response.send(products)
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform }) {
    try {
      const { name, description, price, image_id } = request.all()

      return response.status(201).send(await transform.item(
        await Product.create({
          name,
          description,
          price,
          image_id
        }),
        Transformer))
    } catch (error) {
      response.status(400).send({
        message: 'Não foi possível criar o produto neste momento!'
      })
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    return response.send(await transform.item(Product.findOrFail(id), Transformer))
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var product = await Product.findOrFail(id)
    try {
      const { name, description, price, image_id } = request.all()
      product.merge({ name, description, price, image_id })
      await product.save()
      return response.send(await transform.item(product, Transformer))
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar este produto!' })
    }
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const product = await Product.findOrFail(id)
    try {
      await product.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível excluir!' })
    }
  }
}

module.exports = ProductController
