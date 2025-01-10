const Router = require("@koa/router");
const Joi = require("joi");
const authorsRepo = require("../repo/authors");
const validate = require("../middleware/validate");

const router = new Router();

router.get("/getAllAuthors", async function (ctx) {
  ctx.body = await authorsRepo.getAllAuthors();
});

router.get(
  "/getAuthor/:authorId",
  validate.params({
    authorId: Joi.number().integer().required(),
  }),
  async function (ctx) {
    const authorId = ctx.params.authorId;
    ctx.body = await authorsRepo.getAuthorById(authorId);
  }
);

router.post(
  "/createAuthor",
  validate.body({
    name: Joi.string().trim().required(),
  }),
  async function (ctx) {
    ctx.body = await authorsRepo.createAuthor(ctx.request.body);
  }
);

router.put(
  "/updateAuthor/:authorId",
  validate.params({
    authorId: Joi.number().integer().required(),
  }),
  async function (ctx) {
    const authorId = ctx.params.authorId;
    const updatedAuthor = await authorsRepo.updateAuthor(
      authorId,
      ctx.request.body
    );

    if (!updatedAuthor) {
      ctx.status = 404;
      ctx.body = { message: "Author not found" };
      return;
    }

    ctx.body = updatedAuthor;
  }
);

router.delete(
  "/deleteAuthor/:authorId",
  validate.params({
    authorId: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const authorId = ctx.params.authorId;
    const isDeleted = await authorsRepo.deleteAuthor(authorId);

    if (!isDeleted) {
      ctx.status = 404;
      ctx.body = { message: "Author not found" };
      return;
    }
    ctx.body = isDeleted;
  }
);

module.exports = router;
