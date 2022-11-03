require("dotenv").config();
const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const cors = require("@koa/cors");

const dbConnect = require("./utils/dbUtil");
const userRoutes = require("./routes/userRoutes");
const userAccountRoutes = require("./routes/userAccountRoutes");

const app = new Koa();
const router = new KoaRouter();

app.use(bodyparser());
app.use(cors());
app.use(json());
app.use(router.routes()).use(router.allowedMethods());

app.use(userAccountRoutes.routes());
app.use(userRoutes.routes());

router.get("/", (ctx) => {
  ctx.body = { success: true, message: "Hello" };
});

app.listen(process.env.PORT, () => {
  dbConnect();
  console.log(`App running on http://localhost:${process.env.PORT}`);
});
