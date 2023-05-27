import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Branch from 'App/Models/Branch'

export default class extends BaseSeeder {
  public async run () {
    await Branch.createMany([
      {
        id: 1
      },
    ])
  }
}
