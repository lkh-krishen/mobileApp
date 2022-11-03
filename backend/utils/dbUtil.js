const mongoose = require("mongoose");

const dbConnect = () => {
  const url = process.env.MONGODB_URL;
  const connectionStatus = mongoose.connection.readyState;
  //assigned the connection status of the database

  if (connectionStatus === 0) {
    /*
     *  an instance is created only if an instance doesnt exist
     *  this makes sure only one instance exists
     */
    mongoose.connect(url, () => {
      console.log(`connected to ${url.split("/")[3].split("?")[0]}`);
    });
  }
};

module.exports = dbConnect;
