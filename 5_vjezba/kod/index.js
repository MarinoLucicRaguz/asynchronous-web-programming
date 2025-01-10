const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;
const fsSync = require("fs");
const { finished } = require("node:stream/promises");

const defaultSize = [50, 100, 150];
const firstArgument = process.argv[2];
const secondArgument = process.argv[3];
const loadImagesPath = "../slike";
const writeImagesPath = "../noveslike";

class CustomError extends Error {
  constructor(name, message, error) {
    super(message);
    this.name = name;
    this.status = error;
    this.stack = this.stack.replace(/\n/g, "");
  }
}

async function writeLog(error) {
  try {
    const errorpath = path.join(__dirname, "error_log.txt");
    const time = new Date().toUTCString();
    const text = `${time} ${error.name} - ${error.status} - ${error.stack} \n`;
    await fs.appendFile(errorpath, text, "utf-8");
  } catch (err) {
    console.log("Error while writing error log: ", err);
  }
}

function checkSize(firstArg, secondArg) {
  if (firstArg != "--velicina" || secondArg == undefined) {
    throw new CustomError(
      "InvalidArgument",
      "Inputed arguments are incorrect.",
      "Warning"
    );
  }

  sizeArg = secondArg.split("x");
  if (sizeArg.length != 2) {
    throw new CustomError(
      "InvalidSize",
      "Inputed size has too many size arguments.",
      "Warning"
    );
  }

  sizeArg = sizeArg.map((value) => {
    let intValue = parseInt(value);
    if (isNaN(intValue)) {
      throw new CustomError(
        "InvalidInput",
        "Inputed size is not a number.",
        "Warning"
      );
    }
    return intValue;
  });

  if (sizeArg[0] != sizeArg[1] || !defaultSize.includes(sizeArg[0])) {
    throw new CustomError(
      "InvalidSize",
      "Inputed size is not supported.",
      "Error"
    );
  }

  return [sizeArg[0]];
}

async function resizeImage(inputpath, size) {
  const filename = path.basename(inputpath, path.extname(inputpath));
  const outputPath = path.join(
    writeImagesPath,
    `${filename}-${size}x${size}.jpg`
  );

  const readStream = fsSync.createReadStream(inputpath);
  const writeStream = fsSync.createWriteStream(outputPath);

  const resize = sharp().resize(size, size);

  readStream.pipe(resize).pipe(writeStream);

  await finished(writeStream);

  const { size: fileSize } = await fs.stat(outputPath);
  return `${path.basename(outputPath)} - ${fileSize} bytes`;
}

async function main() {
  try {
    let sizeForImages = defaultSize;
    if (firstArgument != undefined && secondArgument != undefined)
      sizeForImages = checkSize(firstArgument, secondArgument);

    const files = await fs.readdir(loadImagesPath);
    const imgfiles = files.filter((file) => file.endsWith(".jpg"));
    const legenda = [];

    if (!fsSync.existsSync(writeImagesPath)) {
      await fs.mkdir(writeImagesPath);
    }

    for (const img of imgfiles) {
      const inputPath = path.join(loadImagesPath, img);
      for (const size of sizeForImages) {
        try {
          const log = await resizeImage(inputPath, size);
          legenda.push(log);
        } catch (err) {
          console.log(err);
          await writeLog(err);
        }
      }
    }

    await fs.writeFile(
      path.join(path.join(__dirname, writeImagesPath), "legenda.txt"),
      legenda.join("\n"),
      "utf-8"
    );
  } catch (err) {
    console.log(err);
    await writeLog(err);
  }
}

main();
