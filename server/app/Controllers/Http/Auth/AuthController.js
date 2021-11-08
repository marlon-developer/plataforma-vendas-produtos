'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const Role = use('Role')
const Ws = use('Ws')

class AuthController {
  async register({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const { name, surname, email, password } = request.all()
      const user = await User.create({ name, surname, email, password }, trx)
      await user.roles().attach([Role.findBy('slug', 'client').id], null, trx)
      await trx.commit()
      const topic = Ws.getChannel('notifications').topic('notifications')

      if (topic) {
        topic.broadcast('new:user')
      }

      return response.status(201).send({ data: user })
    } catch (error) {
      await trx.rollback()
      return response.status(400).send({
        message: 'Erro ao Cadastrar!'
      })
    }
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all()
    let data = await auth.withRefreshToken().attempt(email, password)
    return response.send({ data })
  }

  async refresh({ request, response, auth }) {
    return await response.send({
      data: auth.generateForRefreshToken((request.input('refresh_token')) ? request.input('refresh_token') : request.header('refresh_token'))
    })
  }

  async logout({ request, response, auth }) {
    await auth.authenticator('jwt').revokeTokens([(request.input('refresh_token')) ? request.input('refresh_token') : request.header('refresh_token')], true)
    return response.status(204).send({})
  }

  async forgot({ request, response }) {
    //
  }

  async remember({ request, response }) {
    //
  }

  async reset({ request, response }) {
    //
  }
}

module.exports = AuthController
