import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('contacts',(table) => {
    table.uuid('id').primary()
    table.string('name',100).notNullable()
    table.string('email',100).notNullable()
    table.string('phone',20)
    table.uuid('category_id').unsigned().notNullable().references('id').inTable('categories').onDelete('CASCADE')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('contacts')
}

