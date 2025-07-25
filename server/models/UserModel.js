const mongoose = require("mongoose");

const userStorage = {
    emailID: { type: String, required: true, index: true },
    name: { type: String, required: true },
    password: { type: String },
    googleId: String,
    authProvider: { type: String, default: 'email' },
};

const schemaOptions = {
    versionKey: false 
};

const schema = new mongoose.Schema(userStorage, schemaOptions);
const UserCollection = mongoose.model("UserCollection", schema);

module.exports = UserCollection;
