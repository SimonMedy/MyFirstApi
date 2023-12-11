const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

//connection bdd
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "pokemon",
});

//definir les droits de connection et de requetes
app.use(
  cors({
    origin: "*" , //tout le monde peux se connecter à l'api
  }
  )
);

//Configuration des routes
app.get("/", (req, res) => {
  res.json("Hello world");
});

app.get("/api/", (req, res) => {
  res.json("Pokemons API");
});

//recup tout les pokemons
app.get("/api/pokemons", (req, res) => {
  connection.query("SELECT * FROM pokemons", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la recuperation des donnees");
    } else {
      res.json(results);
    }
  });
});

//recup pokemon avec id
app.get("/api/pokemons/:id", (req, res) => {
  const idPokemon = req.params.id;
  connection.query(
    "SELECT * FROM pokemons WHERE id = ?",
    [idPokemon],
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la recuperation des donnees");
      } else {
        res.json(results);
      }
    }
  );
});

//recup pokemon avec nom
app.get("/api/pokemons/nom/:nom", (req, res) => {
  const nomPokemon = req.params.nom;
  connection.query(
    "SELECT * FROM pokemons WHERE nom = ?",
    [nomPokemon],
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la recuperation des donnees");
      } else {
        res.json(results);
      }
    }
  );
})

//ajoute des pokemons en bdd avec param nom
app.post("/api/pokemons/", (req, res) => {
  const nomPokemon = req.body.nom;
  connection.query(
    "INSERT INTO pokemons (nom) VALUES (?)",
    [nomPokemon],
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la recuperation des donnees");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

//supprime des pokemons en bdd avec param nom
app.delete("/api/pokemons/:nom", (req, res) => {
  const nomPokemon = req.params.nom;
  console.log(nomPokemon)
  connection.query(
    "DELETE FROM pokemons WHERE nom = ?",
    [nomPokemon],
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la recuperation des donnees");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

//Lancer le serveur
app.listen(3331, () => {
  console.log("Serveur démarré (http://localhost:3331/) !");
});