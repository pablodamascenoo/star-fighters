import app from "./app.js";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const PORT: number = +process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(chalk.bold.cyan("\nServer running on port " + PORT + "\n"));
});
