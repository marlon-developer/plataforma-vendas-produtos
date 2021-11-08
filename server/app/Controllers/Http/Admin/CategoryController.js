'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Category = use('App/Models/Category')
const Transformer = use('App/Transformers/Admin/CategoryTransformer')

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TransformWith} ctx.transform
   * @param { Object } ctx.pagination
   */
  async index({ request, response, transform, pagination }) {
    if (request.input('title')) {
      Category.query().where('title', 'LIKE', `%${request.input('title')}%`)
    }

    var categories = await Category.query().paginate(pagination.page, pagination.limit)
    categories = await transform.paginate(categories, Transformer)
    return response.send(categories)
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform }) {
    try {
      const { title, description, image_id } = request.all()
      return response.status(201).send(await transform.item(Category.create({ title, description, image_id }), Transformer))
    } catch (error) {
      return response.status(400).send({
        message: 'Erro a processar a sua solicitação!'
      })
    }
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, transform, response }) {
    return response.send(await transform.item(Category.findOrFail(id), Transformer))
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var category = await Category.findOrFail(id)
    const { title, description, image_id } = request.all()

    category.merge({ title, description, image_id })
    await category.save()

    return response.send(await transform.item(category, Transformer))
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const category = await Category.findOrFail(id)
    await category.delete()
    return response.status(204).send()
  }
}

module.exports = CategoryController
