const db = require("../db");

async function getAllSongs() {
  return db("songs").select("*");
}

async function createSong(body) {
  const createdSongId = (
    await db("songs").insert({
      name: body.name,
    })
  )?.[0];
  return getSongById(Number(createdSongId));
}

async function getSongById(id) {
  return await db("songs").where({ id }).first();
}

async function updateSong(id, body) {
  const update = await db("songs").where({ id }).update({
    name: body.name,
  });
  return update ? { id, ...body } : null;
}

async function deleteSong(id) {
  const del = await db("songs").where({ id }).del();
  return del > 0;
}

module.exports = {
  getAllSongs,
  createSong,
  getSongById,
  updateSong,
  deleteSong,
};
