const Router = require("@koa/router");
const authorSongsRepo = require("../repo/authorSongs");
const Joi = require("joi");
const validate = require("../middleware/validate");
const router = new Router();

router.post(
  "/authors/:authorId/songs/:songId",
  validate.params({
    authorId: Joi.number().integer().required(),
    songId: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const { authorId, songId } = ctx.params;
    const response = await authorSongsRepo.createAuthorSongRelation(
      authorId,
      songId
    );
    ctx.body = response;
  }
);

router.delete(
  "/authors/:authorId/songs/:songId",
  validate.params({
    authorId: Joi.number().integer().required(),
    songId: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const { authorId, songId } = ctx.params;
    ctx.body = await authorSongsRepo.deleteAuthorSongRelation(authorId, songId);
  }
);

router.get(
  "/authors/:authorId/songs",
  validate.params({
    authorId: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const { authorId } = ctx.params;

    ctx.body = await authorSongsRepo.getAllSongsByAuthor(authorId);
  }
);

module.exports = router;
