const fs = require("fs");
const path = require("path");

// const nomeFile2 = process?.argv?.[2];
const nomeFile3 = process?.argv?.[3];

const directoryPath = path.resolve(__dirname, "src", "components");
const fileName = (nomeFile3) + ".js" || "component.js";
let filePath = path.resolve(directoryPath, fileName);
const fileContent = fs.readFileSync(path.resolve(__dirname, "template-component-react.txt"));

try {
  // Crea le cartelle se non esistono
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
    console.log(`Cartelle create con successo: ${directoryPath}`);
  }

  let i = 1;
  while (fs.existsSync(filePath)) {
    fileName = `${fileName}-${i}`;
    i++;
  }

  console.log(fileName);

  // Scrivi il file
  fs.writeFileSync(filePath, String(fileContent).replaceAll("[fileName]", fileName.replace(".js", "")));
  console.log('File "saluto.js" creato con successo.');
} catch (err) {
  console.error("Si è verificato un errore durante la creazione del file:", err);
}

console.log('File "saluto.js" creato con successo.');
