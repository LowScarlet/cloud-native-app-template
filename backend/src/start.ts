import chalk from "chalk";
import app from "./app.ts";

// Environment variables with fallback defaults
const port = parseInt(process.env.PORT || "5000", 10);
const node = process.env.NODE_ENV || "dev";

app.listen(port, () => {
  console.clear();
  console.log(
    chalk.greenBright(`🚀 [${node.toUpperCase()}] Server is up and running!`),
  );
  console.log(
    chalk.yellow(`🌐 Listening at: `) +
      chalk.cyanBright(`http://localhost:${port}`),
  );
});
