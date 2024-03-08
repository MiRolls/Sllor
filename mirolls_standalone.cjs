const fs = require("fs");

const distPath = ".next";
const filePath = `${distPath}/standalone/server.js`;
const originMtJSON = "theme.mirolls.json";
const destinationMtJSON = `${distPath}/standalone/theme.mirolls.json`;

fixNextJSBug();

// ReadFile
function writeFile() {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Add some thing
    const modifiedContent = data.replace(
      /\'0.0.0.0\'/g,
      '"0.0.0.0"; const serverURL = process.env.SERVERURL;',
    );

    // change /[[[serverURL]]] to serverURL + "
    const finalContent = modifiedContent.replace(
      /\"\/\[\[\[serverURL\]\]\]/g,
      'serverURL + "',
    );

    // Write File
    fs.writeFile(filePath, finalContent, "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("[MIROLLS] File write successfully.");
    });
  });
}

function copyMiRollsFiles() {
  /* copy mt.json */
  //create streams
  const readStream = fs.createReadStream(originMtJSON);
  const writeStream = fs.createWriteStream(destinationMtJSON);
  // copy file
  fs.cp(originMtJSON, destinationMtJSON, { recursive: true }, (err) => {
    if (err) {
      console.error("[MIROLLS] ERROR: Can't copy mt.json ", err);
      return;
    }
    console.log("[MIROLLS] mt.json copy completed.");
  });
}

function fixNextJSBug() {
  /* Fix bug, when use production mode, all static files will throw 404 not found*/
  /* Fix method: copy filepath ./.next/static to ./.next/standalone/.next/static*/
  const staticPath = `${distPath}/static`;
  const standaloneStaticPath = `${distPath}/standalone/.next/static`;
  fs.cp(staticPath, standaloneStaticPath, { recursive: true }, (err) => {
    if (err) {
      console.error("[MIROLLS] ERROR: Can't copy static files ", err);
      return;
    }
    console.log("[MIROLLS] Static files copy completed.");
  });
}
