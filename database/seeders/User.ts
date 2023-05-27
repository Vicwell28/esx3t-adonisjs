import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([{
      id: 1, 
      username: "admin",
      email: "admin@gmail.com",
      password: "admin",
      role_id: 1
    }])
  }
}
