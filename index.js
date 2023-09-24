const fs = require("fs");
const path = require("path");
// Importa il modulo `yargs` per analizzare gli argomenti della riga di comando

// OBIETTIVI
// stai testando se puoi prendere il valore del --template con yargs
const yargs = require('yargs');
// per usare il comando si usa "npm run file --prefix ./node-modules/package.json" nel proggetto index

const nomeFile2 = process?.argv?.[2];

console.log(yargs.argv);
process.exit();

const contieneParola1 = ["c", "create"].some(parola => nomeFile2.includes(parola));

if (contieneParola1) {
  const nomeFile3 = process?.argv?.[3];

  let fileName = (nomeFile3 || "component").replace(/(\+|\.|\*|\/)/g, "");

  const isPackage = path.resolve(__dirname, "..", "..", "package.json");

  let directoryPath;

  if (fs.existsSync(isPackage)) {
    directoryPath = path.resolve(__dirname, "..", "..", "src", "components");
  } else {
    directoryPath = path.resolve(__dirname, "src", "components");
  }

  let filePath = path.resolve(directoryPath, fileName.includes(".js") ? fileName : `${fileName}.js`);

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
      filePath = path.resolve(directoryPath, fileName.includes(".js") ? fileName : `${fileName}.js`);
      i++;
    }

    // Scrivi il file
    fs.writeFileSync(filePath, String(fileContent).replaceAll("[fileName]", fileName.replace(/(\.js|-)/g, "")));
    console.log(`File "${fileName}.js" creato con successo.`);
  } catch (err) {
    console.error("Si è verificato un errore durante la creazione del file:", err);
  }
}
