import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "sales";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("client_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .nullable();
      table
        .integer("employee_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .nullable();
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
