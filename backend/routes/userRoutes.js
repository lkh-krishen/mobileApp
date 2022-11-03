const KoaRouter = require("koa-router");
const {
  addUser,
  editUser,
  deleteUser,
  getUser,
  getUsers,
  login,
} = require("../controllers/userCtrl");

const router = new KoaRouter({ prefix: "/users" });

router.post("/adduser", addUser);
router.post("/auth", login);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);

module.exports = router;
