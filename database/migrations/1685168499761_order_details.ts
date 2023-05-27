import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "order_details";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("order_id")
        .unsigned()
        .references("id")
        .inTable("orders")
        .onDelete("CASCADE")
        .nullable();
      table
        .integer("product_branche_id")
        .unsigned()
        .references("id")
        .inTable("product_branches")
        .onDelete("CASCADE")
        .nullable();
      table.integer("quantity").notNullable();
      table.boolean("status").defaultTo(true);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
