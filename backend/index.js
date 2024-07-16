import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();


app.use(cors());
const data = [
  {
    min_business_miles: null,
    min_business_tax: null,
    min_economy_miles: 53500,
    min_economy_tax: 189,
    min_first_miles: null,
    min_first_tax: null,
    partner_program: "KLM",
  },
  {
    min_business_miles: 144600,
    min_business_tax: 177,
    min_economy_miles: 55200,
    min_economy_tax: 158,
    min_first_miles: null,
    min_first_tax: null,
    partner_program: "Qantas",
  },
];

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.post("/getFlights", (req, res) => {
  try {
    res.status(200).send(data);
  } catch (error) {
    res.status(501).send({ message: error.message || "Internal server error" });
    console.log(error?.message || error);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
