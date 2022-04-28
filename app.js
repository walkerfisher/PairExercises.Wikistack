const express = require('express');
const res = require('express/lib/response');
const morgan = require('morgan');
const { user } = require('pg/lib/defaults');
const app = express();
const { db, User } = require('./models');

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));

const wikiRouter = require('./routes/wiki');
app.use("/wiki", wikiRouter);

const userRouter = require('./routes/users');
app.use("/users", userRouter);

const main = require("./views/main")
app.get("/", (req, res) => {
    res.redirect("/wiki");
});

async function wiki(){
   // try {
        await db.sync({force: true});
    // } catch (error){
    //     console.error(error)
    //     await db.close()
    // }
    app.listen(3000, () => {
        console.log("app listening at port 3000");
    });
}

wiki();