import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

// setup
const app = express();
const port = 8000;
dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;
mongoose.set("debug", true);
mongoose.connect(MONGO_CONNECTION_STRING).catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express backend!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// routes
app.get("/users", async (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  try {
    const users = await userService.getUsers(name, job);
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await userService.findUserById(id);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send("Resource is not found.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/users", async (req, res) => {
  try {
    const savedUser = await userService.addUser(req.body);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await userService.deleteUserById(id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send("Resource is not found.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
