'use strict'

const DB = use('Database')

class DashboardController {
  async index({ response }) {
    const users = await DB.from('users').getCount()
    const orders = await DB.from('orders').getCount()
    const products = await DB.from('products').getCount()
    const revenues = DB.from('order_items').getSum('subtotal') - DB.from('coupon_order').getSum('discount')
    return response.send({
      users,
      revenues,
      orders,
      products
    })
  }
}

module.exports = DashboardController
