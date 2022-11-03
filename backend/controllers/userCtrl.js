const User = require("../models/userModel");
const UserAccount = require("../models/userAccountModel");

const login = async (ctx) => {
  const { email, password } = ctx.request.body;

  try {
    const user = await User.findOne({ email: email });

    if (user && user.password == password) {
      return (ctx.body = {
        success: true,
        user: user.name,
        userAccount: user,
      });
    }
    return (ctx.body = {
      success: false,
      message: "Invalid login credentials",
    });
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const addUser = async (ctx) => {
  try {
    const { name, contact, email, address, password } = ctx.request.body;

    const userExist = await User.findOne({
      email: email,
    }).select("email");
    if (
      userExist &&
      userExist.email &&
      userExist.email.toLowerCase() == email.toLowerCase()
    ) {
      return (ctx.body = {
        success: false,
        message: "This email is already in use",
      });
    }

    const user = await User.create({
      name: name,
      contact: contact,
      email: email,
      address: address,
      password: password,
    });

    return (ctx.body = { success: true, user });
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const editUser = async (ctx) => {
  try {
    const id = ctx.params.id;
    const { name, contact, email, address } = ctx.request.body;
    const user = await User.findByIdAndUpdate(id, {
      name: name,
      contact: contact,
      email: email,
      address: address,
    });

    return (ctx.body = user);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const getUser = async (ctx) => {
  try {
    const id = ctx.params.id;
    const user = await User.findById(id);

    return (ctx.body = { success: true, user });
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const getUsers = async (ctx) => {
  try {
    const users = await User.find({});
    return (ctx.body = users);
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

const deleteUser = async (ctx) => {
  try {
    const id = ctx.params.id;
    const user = await User.findByIdAndDelete(id);
    if (user && user.account) await UserAccount.findByIdAndDelete(user.account);
    return (ctx.body = { success: true, user });
  } catch (err) {
    return (ctx.body = { error: err.message });
  }
};

module.exports = { addUser, editUser, deleteUser, getUser, getUsers, login };
