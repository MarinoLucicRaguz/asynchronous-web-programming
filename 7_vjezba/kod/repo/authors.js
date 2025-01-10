const db = require("../db");

async function getAllAuthors() {
  return db("authors").select("*");
}

async function createAuthor(body) {
  const createdAuthorId = (
    await db("authors").insert({
      name: body.name,
    })
  )?.[0];
  return getAuthorById(Number(createdAuthorId));
}

async function getAuthorById(id) {
  return await db("authors").where({ id }).first();
}

async function updateAuthor(id, body) {
  const update = await db("authors").where({ id }).update({
    name: body.name,
  });
  return update ? { id, ...body } : null;
}

async function deleteAuthor(id) {
  const del = await db("authors").where({ id }).del();
  return del > 0;
}

module.exports = {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
