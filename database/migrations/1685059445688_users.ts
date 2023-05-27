import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("username", 50).notNullable().unique();
      table.string("email", 255).notNullable().unique();
      table.string("password", 180).notNullable();
      table.string("remember_me_token").nullable();
      table.string("fname", 50).nullable();
      table.string("lname", 50).nullable();
      table.date("date_birth").nullable();
      table.string("rfc", 13).nullable();
      table.string("address").nullable();
      table.string("postal_code").nullable();
      table
        .integer("role_id")
        .unsigned()
        .references("id")
        .inTable("roles")
        .onDelete("CASCADE");
      table
        .integer("city_id")
        .unsigned()
        .references("id")
        .inTable("cities")
        .onDelete("CASCADE")
        .nullable();
      table
        .integer("branche_id")
        .unsigned()
        .references("id")
        .inTable("branches")
        .onDelete("CASCADE")
        .nullable();
      table.boolean("status").defaultTo(true);

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true }).notNullable();
      table.timestamp("updated_at", { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
