const fs = require("fs");

const distPath = ".next";
const filePath = `${distPath}/standalone/server.js`;
const originMtJSON = "mt.json";
const destinationMtJSON = `${distPath}/standalone/mt.json`;

// ReadFile
fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Add some thing
    const modifiedContent = data.replace(
        /\'0.0.0.0\'/g,
        '"0.0.0.0"; const serverURL = process.env.SERVERURL;'
    );

    // change /[[[serverURL]]] to serverURL + "
    const finalContent = modifiedContent.replace(/\"\/\[\[\[serverURL\]\]\]/g, 'serverURL + "');

    // Write File
    fs.writeFile(filePath, finalContent, "utf8", err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("[MIROLLS] File write successfully.");
    });

    /* copy mt.json */
    //create streams
    const readStream = fs.createReadStream(originMtJSON);
    const writeStream = fs.createWriteStream(destinationMtJSON);
    // copy file
    readStream.pipe(writeStream);
    writeStream.on("finish", () => {
        console.log("[MIROLLS] Mt.json copy completed.");
    });
    readStream.on("error", err => {
        console.error("[MIROLLS] ERROR: Can't read file ", err);
    });

    writeStream.on("error", err => {
        console.error("[MIROLLS] ERROR: Can't write file ", err);
    });
});
