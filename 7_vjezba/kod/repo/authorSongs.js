const db = require("../db");

async function createAuthorSongRelation(authorId, songId) {
  const authorExists = await db("authors").where({ id: authorId }).first();
  const songExists = await db("songs").where({ id: songId }).first();
  if (!authorExists) {
    throw new Error("Author ne postoji");
  }

  if (!songExists) {
    throw new Error("Pjesma ne postoji");
  }

  await db("author_songs").insert({
    author_id: authorId,
    song_id: songId,
  });

  const createdRelation = await db("author_songs")
    .select("*")
    .where({ author_id: authorId, song_id: songId })
    .first();

  return createdRelation;
}

async function deleteAuthorSongRelation(authorId, songId) {
  return db("author_songs")
    .where({ author_id: authorId, song_id: songId })
    .del();
}

async function getAllSongsByAuthor(authorId) {
  return db("songs")
    .join("author_songs", "songs.id", "=", "author_songs.song_id")
    .where("author_songs.author_id", authorId)
    .select("songs.*");
}

module.exports = {
  createAuthorSongRelation,
  deleteAuthorSongRelation,
  getAllSongsByAuthor,
};
