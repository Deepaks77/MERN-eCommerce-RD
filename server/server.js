const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

//app
const app = express();

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("db connected");
	})
	.catch((err) => console.log("Db Connection Error", err));

//middlewares

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//import and use routes middleware
//import all routes file synchronously
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));
// port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log("App is running and listening at Port", PORT);
});
