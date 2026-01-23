import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express backend!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserById = (id) => {
  // use find instead of filter cuz it returns just the first occurance
  return users["users_list"].find((user) => user["id"] === id);
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

function generateRandomId() {
  return String(Math.floor(Math.random() * 900));
}

const deleteUserById = (userId) => {
  const loc = users["users_list"].findIndex((user) => user.id === userId);
  if (loc === -1) {
    return 404;
  } else {
    users["users_list"].splice(loc, 1);
    return 204;
  }
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name != undefined) {
    let result = findUserByName(name);
    if (job != undefined) {
      result = result.filter((user) => user.job === job);
    }
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource is not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const id = generateRandomId();
  const userToAdd = { id, ...req.body };
  addUser(userToAdd);
  res.status(201).json(userToAdd);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const success = deleteUserById(id);
  res.sendStatus(success);
});
