const { expect } = require("chai");
const authorsRepo = require("../repo/authors");

describe("Author routes", function () {
  describe("GET /getAllAuthors", function () {
    it("should fetch all authors", async function () {
      const resp = await global.api.get("/getAllAuthors").expect(200);

      expect(resp.body).to.be.an("array");
      if (resp.body.length > 0) {
        expect(Object.keys(resp.body[0])).to.include.members([
          "id",
          "name",
          "created_at",
        ]);
      }
    });
  });

  describe("GET /getAuthor/:authorId", function () {
    let createdAuthor;

    before(async function () {
      createdAuthor = await authorsRepo.createAuthor({ name: "J.K. Rowling" });
    });

    it("should fetch the author by ID", async function () {
      const resp = await global.api
        .get(`/getAuthor/${createdAuthor.id}`)
        .expect(200);

      expect(resp.body).to.be.an("object");
      expect(resp.body.name).to.equal(createdAuthor.name);
      expect(resp.body.id).to.equal(createdAuthor.id);
    });
  });

  describe("POST /createAuthor", function () {
    it("should create a new author", async function () {
      const authorName = "George R.R. Martin";
      const resp = await global.api
        .post("/createAuthor")
        .send({ name: authorName })
        .expect(200);

      expect(resp.body.name).to.be.equal(authorName);
    });

    it("should return error if name is missing", async function () {
      const resp = await global.api.post("/createAuthor").send({}).expect(400);

      expect(resp.body.message).to.include('"name" is required');
    });
  });

  describe("PUT /updateAuthor/:authorId", function () {
    let createdAuthor;
    before(async function () {
      createdAuthor = await authorsRepo.createAuthor({ name: "Original Name" });
    });

    it("should update the author name", async function () {
      const updatedName = "Updated Name";
      const resp = await global.api
        .put(`/updateAuthor/${createdAuthor.id}`)
        .send({ name: updatedName })
        .expect(200);

      expect(resp.body).to.be.an("object");
      expect(resp.body.name).to.equal(updatedName);
    });

    it("should return 400 for invalid author ID", async function () {
      await global.api
        .put("/updateAuthor/invalidId")
        .send({ name: "Test" })
        .expect(400);
    });

    it("should return 404 for non-existing author", async function () {
      await global.api
        .put("/updateAuthor/99999")
        .send({ name: "Test" })
        .expect(404);
    });
  });

  describe("DELETE /deleteAuthor/:authorId", function () {
    let createdAuthor;

    before(async function () {
      createdAuthor = await authorsRepo.createAuthor({
        name: "Author to Delete",
      });
    });

    it("should delete the author", async function () {
      const resp = await global.api
        .delete(`/deleteAuthor/${createdAuthor.id}`)
        .expect(200);

      expect(resp.body).to.be.a("boolean");
      expect(resp.body).to.be.true;
    });

    it("should return 400 for invalid author ID", async function () {
      await global.api.delete("/deleteAuthor/invalidId").expect(400);
    });

    it("should return 404 for non-existing author", async function () {
      await global.api.delete("/deleteAuthor/99999").expect(404);
    });
  });
});
