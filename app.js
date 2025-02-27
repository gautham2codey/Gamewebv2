const express = require("express");
const app = express();
const fetch = require("node-fetch");
const port = process.env.PORT || 3000; // Replace config.port with 3000
const Corrosion = require("./lib/server");

const proxy = new Corrosion({
    prefix: "/proxy", // Set a default prefix or configure it as needed
    codec: "json", // Set a default codec or configure it
    title: "Greatsword",
    forceHttps: true,
    requestMiddleware: [
        Corrosion.middleware.blacklist([
            "accounts.google.com",
        ], "Page is blocked"),
    ]
});

proxy.bundleScripts();

app.use(express.static("./public", {
    extensions: ["html"]
}));

app.get("/", function(req, res){
    res.sendFile("index.html", {root: "./public"});
});

app.get("/suggestions", function(req, res){
    async function getsuggestions() {
        var term = req.query.q || "";
        var response = await fetch("https://duckduckgo.com/ac/?q=" + term + "&type=list");
        var result = await response.json();
        var suggestions = result[1];
        res.send(suggestions);
    }
    getsuggestions();
});

app.use(function (req, res) {
    if (req.url.startsWith(proxy.prefix)) {
        proxy.request(req, res);
    } else {
        res.status(404).sendFile("404.html", {root: "./public"});
    }
});

app.listen(port, () => {
    console.log(`Greatsword V3 is running at http://localhost:${port}`);
});
