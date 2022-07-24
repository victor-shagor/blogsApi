import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";

import routes from "./routes";

dotenv.config();

const port = process.env.PORT || 6004;
const app = express();

// Don't log to the console when running integration tests
// if (app.get("env") !== "test") {
//   app.use(morgan("dev"));
// }

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
  console.log("connected succussfully")
);
mongoose.connection.on("error", () => console.log("error connecting"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "./client/build")));
// }

app.listen(port, () => {
  console.info(`Server is up and listening on port ${port}`);
});

routes(app);

app.all("*", (req, res) =>
  res.status(404).json({
    success: false,
    message: "route not found",
  })
);

export default app;
