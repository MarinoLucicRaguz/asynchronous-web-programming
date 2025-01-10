const { expect } = require("chai");
const songsRepo = require("../repo/songs");

describe("Song routes", function () {
  let createdSong;

  before(async function () {
    createdSong = await songsRepo.createSong({ name: "Test Song" });
  });

  describe("GET /getAllSongs", function () {
    it("should fetch all songs", async function () {
      const resp = await global.api.get("/getAllSongs").expect(200);

      expect(resp.body).to.be.an("array");
      expect(resp.body.length).to.be.greaterThan(0);
      expect(resp.body[0]).to.have.all.keys("id", "name", "created_at");
    });
  });

  describe("GET /getSong/:songId", function () {
    it("should fetch the song by ID", async function () {
      const resp = await global.api
        .get(`/getSong/${createdSong.id}`)
        .expect(200);

      expect(resp.body).to.be.an("object");
      expect(resp.body.id).to.equal(createdSong.id);
      expect(resp.body.name).to.equal(createdSong.name);
    });
  });

  describe("POST /createSong", function () {
    it("should create a new song", async function () {
      const songName = "New Song";
      const resp = await global.api
        .post("/createSong")
        .send({ name: songName })
        .expect(200);

      expect(resp.body).to.be.an("object");
      expect(resp.body.name).to.equal(songName);
    });

    it("should return 400 if the name is missing", async function () {
      const resp = await global.api.post("/createSong").send({}).expect(400);

      expect(resp.body.message).to.include('"name" is required');
    });
  });

  describe("PUT /updateSong/:songId", function () {
    it("should update the song name", async function () {
      const updatedName = "Updated Song Name";
      const resp = await global.api
        .put(`/updateSong/${createdSong.id}`)
        .send({ name: updatedName })
        .expect(200);

      expect(resp.body).to.be.an("object");
      expect(resp.body.name).to.equal(updatedName);
    });
  });

  describe("DELETE /deleteSong/:songId", function () {
    let songToDelete;

    before(async function () {
      songToDelete = await songsRepo.createSong({ name: "To Delete" });
    });

    it("should delete the song", async function () {
      const resp = await global.api
        .delete(`/deleteSong/${songToDelete.id}`)
        .expect(200);

      expect(resp.body).to.be.a("boolean");
      expect(resp.body).to.be.true;
    });
  });
});
