const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require('cookie-parser');
const { check } = require('./middlewares/auth');

const app = express();

const PORT = 3000;

// middle wares
app.use(express.static('./public/'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');


app.get("/",check, (req, res) => {
    res.render('home');
});




app.use(authRoutes);

async function con () {
    try {
        await mongoose.connect('mongodb+srv://ali:Jj7nwuCkF9fUojR9@cluster0.jvmmmzc.mongodb.net/userdata?retryWrites=true&w=majority&appName=Cluster0');
        app.listen(PORT, () => {
            console.log(`SERVER IS OPENING ON PORT: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

con();

// Jj7nwuCkF9fUojR9