const express = require("express");
const server = express();
const port = 3000;

// Array di utenti iniziale
let users = [
  { id: 1, user: "Mario", job: "Sviluppatore" },
  { id: 2, user: "Luigi", job: "Designer" },
  { id: 3, user: "Giulia", job: "Project Manager" },
];

// Middleware per gestire le richieste in arrivo e stampare informazioni di base
server.use((req, res, next) => {
  console.log(`Richiesta di tipo ${req.method} arrivata dall'URL ${req.url}`);
  next();                                                   // Passa al prossimo middleware o alla gestione dell'endpoint
});

// Endpoint per ottenere tutti gli utenti
server.get("/", (req, res) => {
  res.status(200).send(users);                              // Invia l'array di utenti come risposta
});

// Endpoint per ottenere un singolo utente in base all'ID
server.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);                         // Ottiene l'ID dall'URL e lo converte in numero
  const user = users.find((u) => u.id === id);              // Trova l'utente con l'ID corrispondente
  res.status(200).send(user);                               // Invia l'utente trovato come risposta
});

// Middleware per gestire errori 404 (pagina non trovata) se nessun altro endpoint corrisponde alla richiesta
server.use((req, res, next) => {
  res.status(404).send("Pagina non trovata");               // Invia un messaggio di errore
});

// Endpoint per aggiungere nuovi utenti
server.post("/submit", (req, res) => {
  console.log(req.body);                                    // Stampa il corpo della richiesta POST (i nuovi utenti)
  users = [...req.body];                                    // Aggiorna l'array di utenti con i nuovi dati ricevuti
  res.status(201).json({ msg: "Dati ricevuti" });           // Invia una risposta JSON con un messaggio di conferma
});

// Endpoint per eliminare un utente in base all'ID
server.delete("/delete/:id", (req, res) => {
  const id = Number(req.params.id);                         // Ottiene l'ID dall'URL e lo converte in numero
  const filteredUser = users.filter((u) => u.id !== id);    // Filtra gli utenti, escludendo quello con l'ID specificato
  users = filteredUser;                                     // Aggiorna l'array di utenti senza l'utente eliminato
  res.status(200).json({ msg: "Utente eliminato" });        // Invia una risposta JSON con un messaggio di conferma
});

// Endpoint per modificare l'username di un utente in base all'ID
server.patch("/update/:id", (req, res) => {
  const id = Number(req.params.id);                         // Ottiene l'ID dall'URL e lo converte in numero
  const username = req.body.username;                       // Ottiene il nuovo username dal corpo della richiesta
  const updated = users.map((u) => {
    if (u.id === id) {
      return { ...u, user: username };                      // Modifica l'username dell'utente con l'ID corrispondente
    }
    return u;
  });
  users = updated;                                          // Aggiorna l'array di utenti con l'utente modificato
  res.status(200).json({ msg: "Username modificato" });     // Invia una risposta JSON con un messaggio di conferma
});

// Middleware per leggere i dati in formato JSON dalle richieste
server.use(express.json());

// Avvia il server e ascolta sulla porta specificata
server.listen(port, () => console.log(`In esecuzione su http://localhost:${port}`));




