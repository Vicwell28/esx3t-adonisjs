import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "role_views";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("view_id")
        .unsigned()
        .references("id")
        .inTable("views")
        .onDelete("CASCADE")
        .nullable();
      table
        .integer("role_id")
        .unsigned()
        .references("id")
        .inTable("roles")
        .onDelete("CASCADE")
        .nullable();
      table.unique(["view_id", "role_id"]);

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
