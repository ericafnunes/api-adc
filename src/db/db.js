const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect(process.env.MONGO_URL)
    const con = mongoose.connection;
    con.once("open", async () => {
        console.log("conectado!")
    })
}
module.exports = connect;