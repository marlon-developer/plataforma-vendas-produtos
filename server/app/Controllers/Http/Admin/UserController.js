'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
const Transformer = use('App/Transformers/Admin/UserTransformer')
/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.pagination
   */
  async index({ request, response, pagination, transform }) {
    if (request.input('name')) {
      User.query().where('name', 'LIKE', `%${request.input('name')}%`)
      User.query().orWhere('surname', 'LIKE', `%${request.input('name')}%`)
      User.query().orWhere('email', 'LIKE', `%${request.input('name')}%`)
    }

    var users = await User.query().paginate(pagination.page, pagination.limit)
    users = await transform.paginate(users, Transformer)
    return response.send(users)
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform }) {
    try {
      return response.status(201).send(await transform.item(User.create(
        request.only([
          'name',
          'surname',
          'email',
          'password',
          'image_id'
        ]))
        , Transformer))
    } catch (error) {
      return response.status(400).send({ message: 'Não foi possível criar este usuário no momento!' })
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    return response.send(await transform.item(User.findOrFail(id), Transformer))
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var user = await User.findOrFail(id)

    user.merge(request.only([
      'name',
      'surname',
      'email',
      'password',
      'image_id'
    ]))

    await user.save()
    return response.send(await transform.item(user, Transformer))
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const user = await User.findOrFail(id)
    try {
      await user.delete()
      return response.status(204).send()
    } catch (error) {
      response
        .status(500)
        .send({ message: 'Não foi possível excluir!' })
    }
  }
}

module.exports = UserController
