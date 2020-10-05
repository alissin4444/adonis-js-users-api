'use strict'

const User = use('App/Models/User')

class UserController {
  async index({ request, response }) {
    const users = await User.all()

    return response.ok(users)
  }

  async store({ request, response }) {
    const { name, email, password } = request.all()

    const user = await User.create({ name, email, password })

    return response.created(user)
  }

  async show({ request, response, params }) {
    const { id } = params

    const user = await User.find(id)

    return response.ok(user)
  }

  async update({ request, response, params }) {
    const { id } = params

    const { name, email, password } = request.all()

    const user = await User.find(id)

    user.merge({ name, email, password })

    await user.save()

    return response.ok(user)
  }

  async destroy({ response, params }) {
    const { id } = params

    const user = await User.find(id)

    await user.delete()

    return response.noContent()
  }
}

module.exports = UserController
