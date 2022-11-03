const KoaRouter = require("koa-router");
const {
  addUserAccount,
  getUserAccount,
  getUserAccounts,
  deleteUserAccount,
  topUpUserAccount,
  deductUserAccount,
  activate_Deactivate_UserAccount,
} = require("../controllers/userAccountCtrl");

const router = new KoaRouter({ prefix: "/users/account" });

router.post("/add", addUserAccount);
router.put("/:id/topup", topUpUserAccount);
router.put("/:id/deduct", deductUserAccount);
router.put("/:id/validity", activate_Deactivate_UserAccount);
router.delete("/:id", deleteUserAccount);
router.get("/:id", getUserAccount);
router.get("/", getUserAccounts);

module.exports = router;
