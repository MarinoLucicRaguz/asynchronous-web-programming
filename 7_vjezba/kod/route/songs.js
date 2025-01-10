const Router = require("@koa/router");
const songsRepo = require("../repo/songs");

const Joi = require("joi");
const validate = require("../middleware/validate");
const router = new Router();

router.get("/getAllSongs", async function (ctx) {
  ctx.body = await songsRepo.getAllSongs();
});

router.get(
  "/getSong/:songId",
  validate.params({
    songId: Joi.number().integer().required(),
  }),
  async function (ctx) {
    const songId = ctx.params.songId;
    ctx.body = await songsRepo.getSongById(songId);
  }
);

router.post(
  "/createSong",
  validate.body({
    name: Joi.string().trim().required(),
  }),
  async function (ctx) {
    ctx.body = await songsRepo.createSong(ctx.request.body);
  }
);

router.put(
  "/updateSong/:songId",
  validate.params({
    songId: Joi.number().integer().required(),
  }),
  async function (ctx) {
    const songId = ctx.params.songId;
    const response = await songsRepo.updateSong(songId, ctx.request.body);

    if (!response) {
      ctx.status = 404;
      ctx.body = { message: "Song not found" };
      return;
    }

    ctx.body = response;
  }
);

router.delete(
  "/deleteSong/:songId",
  validate.params({
    songId: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const songId = ctx.params.songId;
    ctx.body = await songsRepo.deleteSong(songId);
  }
);

module.exports = router;
