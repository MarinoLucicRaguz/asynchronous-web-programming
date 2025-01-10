const { expect } = require("chai");
const authorsRepo = require("../repo/authors");
const songsRepo = require("../repo/songs");
const authorSongsRepo = require("../repo/authorSongs");

describe("Author Song routes", function () {
  let author, song;

  before(async function () {
    author = await authorsRepo.createAuthor({ name: "Test Author" });
    song = await songsRepo.createSong({ name: "Test Song" });
  });

  describe("POST /authors/:authorId/songs/:songId", function () {
    it("should create a relationship between the author and the song", async function () {
      const resp = await global.api
        .post(`/authors/${author.id}/songs/${song.id}`)
        .expect(200);

      expect(resp.body).to.be.an("object");
      expect(resp.body.author_id).to.equal(author.id);
      expect(resp.body.song_id).to.equal(song.id);
    });
  });

  describe("DELETE /authors/:authorId/songs/:songId", function () {
    it("should delete the relationship between the author and the song", async function () {
      const resp = await global.api
        .delete(`/authors/${author.id}/songs/${song.id}`)
        .expect(200);

      expect(resp.body).to.be.equal(1);
    });
  });

  describe("GET /authors/:authorId/songs", function () {
    before(async function () {
      await authorSongsRepo.createAuthorSongRelation(author.id, song.id);
    });

    it("should fetch all songs by the author", async function () {
      const resp = await global.api
        .get(`/authors/${author.id}/songs`)
        .expect(200);

      expect(resp.body).to.be.an("array");
      expect(resp.body.length).to.be.greaterThan(0);
      expect(resp.body[0]).to.have.property("id", song.id);
    });
  });
});
