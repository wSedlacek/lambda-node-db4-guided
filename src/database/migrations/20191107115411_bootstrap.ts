import * as Knex from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.createTable('zoos', (tbl) => {
    tbl.increments();
    tbl.string('zoo_name').notNullable();
    tbl.string('address');
  });

  await knex.schema.createTable('species', (tbl) => {
    tbl.increments();
    tbl.string('species_name').notNullable();
  });

  await knex.schema.createTable('animals', (tbl) => {
    tbl.increments();
    tbl.string('animal_name').notNullable();
    tbl
      .integer('species_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('species')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  });

  await knex.schema.createTable('zoo_animals', (tbl) => {
    tbl.increments();

    tbl
      .integer('zoo_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('zoos')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');

    tbl
      .integer('animal_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('animals')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable('zoo_animals');
  await knex.schema.dropTable('animals');
  await knex.schema.dropTable('species');
  await knex.schema.dropTable('zoos');
};
