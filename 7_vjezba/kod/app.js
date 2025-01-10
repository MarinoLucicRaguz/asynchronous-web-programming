require("dotenv-safe").config();
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const authorsRouter = require("./route/authors");
const songsRouter = require("./route/songs");
const authorSongsRouter = require("./route/authorSongs");
const indexRouter = require("./route/index");

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.body = {
      err,
      message: err.message,
    };
  }
});

app.use(authorsRouter.routes());
app.use(songsRouter.routes());
app.use(indexRouter.routes());
app.use(authorSongsRouter.routes());

module.exports = app;
