const fs = require("fs");

const filePath = "dist/standalone/server.js";

// ReadFile
fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Add some thing
    const modifiedContent = data.replace(
        /\'0.0.0.0\'/g,
        '"0.0.0.0";const serverURL = process.env.SERVERURL'
    );

    // change [[[serverURL]]] to serverURL + "
    const finalContent = modifiedContent.replace(/\"\/\[\[\[serverURL\]\]\]/g, 'serverURL + "');

    // Write File
    fs.writeFile(filePath, finalContent, "utf8", err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("File modified successfully.");
    });
});
