import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "views";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name", 50).nullable();
      table.string("description", 250).nullable().defaultTo("");
      table
        .integer("view_category_id")
        .unsigned()
        .references("id")
        .inTable("view_categories")
        .onDelete("CASCADE")
        .nullable();
      table.boolean("status").defaultTo(true);
      table.string("url")
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
