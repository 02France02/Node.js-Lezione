import express from "express";
import pgPromise from "pg-promise";
import dotenv from "dotenv";
// Caricare file
import multer, { MulterError, diskStorage } from "multer";

dotenv.config();

const db = pgPromise()("postgres://postgres:123456789@localhost:5432/movies");
const port = process.env.PORT;
const app = express();

app.use(express.json());

// Caricare file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Gestione upload
const upload = multer({ storage: storage });

// Endpoint per caricamento singolo / multiplo
app.post("/films/uploads", (req, res) => {
  upload.array("myFiles", 3)(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      return res.status(500).json({ msg: error.message });
    } else if (error) {
      return res.status(500).json({ msg: error.message });
    }
    res.status(200).json({ msg: "File caricato" });
  });
});

app.get("/films", async (req, res) => {
  try {
    const moviesData = await db.many(`
        SELECT * FROM "movies-table"
    `);

    res.status(200).json(moviesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

app.get("/films/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    //restituisce un valore o null
    const moviesData = await db.oneOrNone(`
        SELECT * FROM "movies-table" WHERE id = ${id}
    `);

    // Se non presente film
    if (moviesData) {
      res.status(200).json(moviesData);
    } else {
      res.status(404).json({ msg: "no movie Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

app.post("/films/new", async (req, res) => {
  try {
    const newMovie = req.body;
    await db.none(`
            INSERT INTO "movies-table" (title, year, director, rating) VALUES ('${newMovie.title}', '${newMovie.year}', '${newMovie.director}', ${newMovie.rating})
        `);
    res.status(201).json({ msg: "Nuovo film aggiunto" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// db.none(`
// INSERT INTO "movies-table" (title, year, director, rating) VALUES ('Film 1', '2000/05/16', 'James Cameron', 5)
// `)

app.listen(port, () => {
  console.log(`In esecuzione su http://localhost:${port}`);
});
