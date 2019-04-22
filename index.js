const express = require("express");

const db = require(".data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("It's alive!");
});

server.get("/hubs", (req, res) => {
  db.find()
    .then(hubs => {
      res.json(hubs);
    })
    .catch(err => {
      //handle error
      res.json({ error: err, message: "Something broke" });
    });
});

server.post("/", (req, res) => {
  const hubInformation = req.body;

  db.hub
    .add(hubInformation)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "Error adding the hub" });
    });
});

server.delete("/hubs/:id", (req, res) => {
  const hubId = req.params.id;
  db.hubs
    .remove(hubId)
    .then(deleted => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "Error deleting the hub" });
    });
});

server.listen(5000, () => {
  console.log("\n*** API running on port 5k ***\n");
});
