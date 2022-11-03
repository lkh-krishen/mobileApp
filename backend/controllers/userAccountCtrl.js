const User = require("../models/userModel");
const UserAccount = require("../models/userAccountModel");

const addUserAccount = async (ctx) => {
  try {
    const { balance, validity, isPermanant, owner } = ctx.request.body;
    const userHasAccount = await User.findById(owner);

    if (userHasAccount.account === null) {
      //is user has account ,this prevents from creating another
      const userAccount = await UserAccount.create({
        balance: balance,
        validity: validity,
        isPermanant: isPermanant,
        owner: owner,
      });
      await User.findByIdAndUpdate(owner, { account: userAccount._id });
      return (ctx.body = { success: true, userAccount });
    } else {
      return (ctx.body = {
        success: false,
        message: "User already has an account",
      });
    }
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const getUserAccount = async (ctx) => {
  try {
    const id = ctx.params.id;
    const userAccount = await UserAccount.findById(id);

    return (ctx.body = { success: true, userAccount });
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const getUserAccounts = async (ctx) => {
  try {
    const userAccounts = await UserAccount.find({});
    return (ctx.body = userAccounts);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const deleteUserAccount = async (ctx) => {
  try {
    const id = ctx.params.id;
    const userAccountOwner = await UserAccount.findById(id);
    const ownerId = userAccountOwner.owner.toString();

    await User.findByIdAndUpdate(ownerId, { account: null });
    const userAccount = await UserAccount.findByIdAndDelete(id);

    return (ctx.body = userAccount);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const topUpUserAccount = async (ctx) => {
  //top up user account balance
  try {
    const id = ctx.params.id;
    const accountBalance = await UserAccount.findById(id);
    const { topUpAmpount } = ctx.request.body;
    const newBalance = accountBalance.balance + topUpAmpount;

    const userAccount = await UserAccount.findByIdAndUpdate(id, {
      balance: newBalance,
    });

    return (ctx.body = { success: true, userAccount });
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const deductUserAccount = async (ctx) => {
  //deducts user account balance
  try {
    const id = ctx.params.id;
    const accountBalance = await UserAccount.findById(id);
    const { topUpAmpount } = ctx.request.body;

    if (topUpAmpount > accountBalance.balance) {
      return (ctx.body = {
        success: false,
        message: "Not enough balance . Please topup",
      });
    } else {
      const newBalance = accountBalance.balance - topUpAmpount;
      const userAccount = await UserAccount.findByIdAndUpdate(id, {
        balance: newBalance,
      });
      return (ctx.body = { success: true, userAccount });
    }
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const activate_Deactivate_UserAccount = async (ctx) => {
  //activates or deactivates user account
  try {
    const id = ctx.params.id;
    const userAccount = await UserAccount.findById(id);
    const accountValidity = userAccount.validity;

    const validatedUserAccount = await UserAccount.findByIdAndUpdate(id, {
      validity: !accountValidity,
    });

    return (ctx.body = { success: true, userAccount });
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

module.exports = {
  addUserAccount,
  getUserAccount,
  getUserAccounts,
  deleteUserAccount,
  topUpUserAccount,
  deductUserAccount,
  activate_Deactivate_UserAccount,
};
