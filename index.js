const express = require("express");
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("index.ejs", { serveroutput: " " });
});

app.post("/", (req, res) => {
    let currency = req.body.cno;
    let from = req.body.fromcurrency;
    let to = req.body.tocurrency;

    let url = `https://api.currencyapi.com/v3/latest?apikey=fca_live_UxOOyUQizxDUF6Vl5Q4ohQVnAjdSGjH3ACMLqMxF&currencies=${from}%2C${to}`;

    axios.get(url)
        .then((response) => {
            console.log(response.data); 
            
            let rate = response.data.data[to].value;
            let convertedAmount = currency * rate;
            res.render('index.ejs', { serveroutput: convertedAmount });
        })
        .catch((error) => {
            console.error("Error fetching data from API:", error.message);
            res.render("index.ejs", { serveroutput: "Error fetching data from API" });
        });
});


const port = 4000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
