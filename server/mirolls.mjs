import express from "express";
import fs from "fs";

const app = express();
const port = 2333;
const jsonfilePath = "server/mirolls.json";
let jsonObject;

fs.readFile(jsonfilePath, "utf8", (err, data) => {
    if (err) {
        console.error("error:", err);
        return;
    }
    jsonObject = JSON.parse(data);
});

app.post("/site/get", (req, res) => {
    console.log(`Access get site`);
    res.send(JSON.stringify(jsonObject["get-site"]));
});

app.listen(port, () => {
    console.log(`Model server is running at ${port}`);
});
