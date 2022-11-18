import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "accounts";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("account_number");
      table.integer("client_id").references("clients.id").onDelete("CASCADE");
      table.integer("agency_id").references("agencies.id").onDelete("CASCADE");
      table.double("balance");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
