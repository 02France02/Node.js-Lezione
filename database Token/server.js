const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const secretKey = process.env.SECRETKEY;

const jwt = require("jsonwebtoken");

const pgp = require("pg-promise")();

const db = pgp("postgres://postgres:123456789@localhost:5432/users");

app.use(express.json());

app.get("/all", async (req, res) => {
  const usersData = await db.many(`
    SELECT * FROM "usersTable"
    `);

  try {
    if (!usersData) {
      console.error("Errore di comunicazione");
      return res.status(400).json({ msg: "No data Found" });
    }
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ msg: "Action Error" });
    console.error(error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const newUser = req.body;
    if (!newUser) {
      return res.status(400).json({ msg: "Bad Request" });
    }
    await db.none(`
    INSERT INTO "usersTable" (email, password, name, surname) 
    VALUES ('${newUser.email}', '${newUser.password}', '${newUser.name}','${newUser.surname}' )
      `);
    res.status(200).json({ msg: "Utente registrato correttamente" });
  } catch (error) {
    res.status(500).json({ msg: "Action Error" });
    console.error(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const newUser = req.body;
    if (!newUser) {
      return res.status(400).json({ msg: "Bad Request" });
    }
    const findUser = await db.oneOrNone(`
    SELECT * FROM "usersTable" WHERE email = '${newUser.email}'
    `);
    if (!findUser) {
      res.status(400).json({ msg: "Utente non registrato" });
    } else {
      if (findUser.password !== newUser.password) {
        res.status(400).json({ msg: "Password errata" });
      }
      // Token
      const token = jwt.sign(findUser, secretKey, { expiresIn: "24h" });

      await db.none(`
      UPDATE "usersTable" SET token = '${token}' WHERE email = '${findUser.email}'
      `);
      res.status(200).json({ msg: "Utente loggato correttamente" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Action Error" });
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`In esecuzione su http://localhost:${port}`);
});

//Creare pagine protette con funzione per autenticare l'utente 