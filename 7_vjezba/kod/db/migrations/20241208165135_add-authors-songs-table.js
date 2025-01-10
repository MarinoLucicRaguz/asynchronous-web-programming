/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("author_songs", (table) => {
    table.integer("author_id").references("id").inTable("authors");
    table.integer("song_id").references("id").inTable("songs");
    table.primary(["author_id", "song_id"]);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("author_songs");
};
