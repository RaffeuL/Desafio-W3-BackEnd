import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'requests'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('buyer_id')
        .references('buyers.id')
        .unsigned()
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('courier_id')
        .references('couriers.id')
        .unsigned()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.integer('status')
      table.string('products')

      table.float('total_price').unsigned()
      table.string('delivery_place')
      table.string('description')
      table.string('observation')
      table.string('buyer_name').notNullable()
      table.string('courier_name')


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
