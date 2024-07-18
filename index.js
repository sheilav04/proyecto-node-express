import express from "express";

import {
  getUserById,
  getUsers,
  saveUser,
  patchInfo,
  updateUserById,
  deleteUser,
} from "./baseDeDatos.js";
const app = express();
const PORT = 3000;

const checkPermissions = (req, res, next) => {
  const { permitir } = req.headers;

  if (permitir != "true") return res.sendStatus(401);

  next();
};
const logRequest = (req, res, next) => {
  console.log(req.method, req.url);

  next();
};
app.use(logRequest);
app.use(express.json());

app.get("/users", checkPermissions, (req, res) => {
  const users = getUsers();
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);
  res.json(user);
});

app.post("/users", checkPermissions, async (req, res) => {
  const newUser = req.body;
  saveUser(newUser);
  res.send(newUser);
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  updateUserById(id, newData);
  res.sendStatus(200);
});

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  patchInfo(id, newData);
  res.sendStatus(200);
});
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  deleteUser(id);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log("running!"));
