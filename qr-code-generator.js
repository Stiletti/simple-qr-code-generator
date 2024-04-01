import inquirer from "inquirer";
import fs from "node:fs";
import qr from "qr-image";

inquirer
  .prompt([
    {
      name: "website",
      type: "input",
      massage: "Type in the url you wanna link to the qr-code: ",
    },
  ])
  .then((answer) => {
    // link input to qr-code
    const image = qr.image(answer.website, { type: "png" });
    // create png
    image.pipe(fs.createWriteStream(answer.website.split(".")[1] + ".png"));
    // create txt to log input
    fs.writeFile("log.txt", answer.website, (err) => {
      if (err) throw err;
      console.log("Files written !");
    });
  });
