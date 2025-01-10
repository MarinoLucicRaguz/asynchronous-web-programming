const readline = require("readline");
const fs = require("fs").promises;
const path = require("path");

const {
  Igra: IgraPotapanja,
  DULJINA_STRANICE_PLOCE,
  GameError,
} = require("./igra");

const novaIgra = new IgraPotapanja();

const questionTekst = `
Opcije:
- n          => napravi novu igru
- p          => ispisi plocu
- m x:1 y:3 => napravi potez na ovim koordinatama
- q          => zaustavi proces

Vas odabir: `;

async function zapisiError(error) {
  try {
    const newpath = path.join(__dirname, "log.txt");
    const time = new Date().toUTCString();
    const data = `${time} ${error.name} ${error.stack} \n`;
    await fs.appendFile(newpath, data, "utf-8");
  } catch (err) {
    throw new GameError("WritingError", "Error while writing to file.");
  }
}

const moveRegex = new RegExp(/m\ x:\d+\ y:\d/);
/**
 * Helper to format user input
 * @param {String} input
 * @returns
 */
function formatInput(input) {
  if (!input) {
    return {};
  }

  switch (input) {
    case "n":
    case "p":
    case "q":
      return { input };
  }

  if (moveRegex.test(input)) {
    const splitInputs = input.split(" ");
    const formattedInput = { input: "m" };

    for (let i = 1; i < 3; i++) {
      const [key, value] = splitInputs[i].split(":");
      formattedInput[key] = Number(value);
    }
    return formattedInput;
  }

  throw new GameError("IncorrectInput", "Uneseni potez nije validan.");
}

async function inputLoop(igraObj) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(questionTekst, async (input) => {
    rl.close();

    try {
      igraObj.jeLiIgraZavrsena();
      const formattedInput = formatInput(input);
      switch (formattedInput.input) {
        case "n":
          if (igraObj.gotovaIgra) {
            igraObj = new IgraPotapanja();
            console.log("Nova igra je zapoceta.");
          } else {
            throw new GameError(
              "StartError",
              "Ne može te pokrenuti novu igru prije nego je prethodna završila."
            );
          }
          break;
        case "p":
          igraObj.ispisPloce();
          break;
        case "m":
          if (!igraObj.gotovaIgra) {
            igraObj.napraviPotez(formattedInput);
          } else {
            throw new GameError(
              "GameOver",
              "Ne možete napraviti potez ako je igra završila."
            );
          }
          break;
        case "q":
          console.log("Igra zavrsena.");
          return process.exit(0);
      }
    } catch (err) {
      console.log(err.message);
      await zapisiError(err);
    }

    console.log("\n");
    process.nextTick(() => inputLoop(igraObj));
  });
}

/**
 *
 * @param {Object} igraObj
 */
function main(igraObj) {
  inputLoop(igraObj);
}

process.nextTick(() => main(novaIgra));
