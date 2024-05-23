// Importa il modulo 'hello' da './hello'
const { sum, name, num } = require("./hello");

// Esegui la funzione 'sum' e assegna il risultato a 'result'
const result = sum(2 + 6);

// Esegui la funzione 'name' con argomento "gino" e logga il risultato
const setName = name("gino");

// Logga il valore di 'num'
console.log(num);

/* --------------------------------------------------------
                  Utilizzo del modulo 'os'
-------------------------------------------------------- */

// Importa il modulo 'os'
const os = require(`os`);

// Logga l'intero oggetto 'os'
console.log(os);

// Logga la piattaforma del sistema operativo
console.log(os.platform);

// Logga le informazioni sulla CPU
console.log(os.cpus);

// Logga le informazioni sull'utente corrente
console.log(os.userInfo);

/* --------------------------------------------------------
             Utilizzo del modulo 'fs' (File System)
-------------------------------------------------------- */

// Importa il modulo 'fs' (File System)
const fs = require("fs");

// Metodo ASINCRONO per leggere il contenuto di un file
fs.readFile(`./readme`, "utf8", (err, data) => {
  if (err) {
    console.error("Errore durante la lettura del file");
  }
  console.log(data);
});

// Metodo ASINCRONO per scrivere il contenuto su un nuovo file
fs.writeFile("./newReadme.txt", "Ciao sono un nuovo file", (err, data) => {
  if (err) {
    console.error("Errore durante la scrittura del file");
  }
  console.log(data);
});

// Metodo ASINCRONO per aggiungere contenuto a un file esistente
const content = "Contenuto da aggiungere";
fs.appendFile("./newReadme.txt", content, (err, data) => {
  if (err) {
    console.error("Errore durante l'aggiunta di contenuto al file");
  }
  console.log("Contenuto aggiunto al file");
});

// Metodo ASINCRONO per eliminare un file
fs.unlink("./newReadme.txt", (err, data) => {
  if (err) {
    console.error("Errore durante l'eliminazione del file");
  }
  console.log("File eliminato");
});

// Metodo ASINCRONO per creare una nuova cartella
fs.mkdir("./assets", (err, data) => {
  if (err) {
    console.error("Errore durante la creazione della cartella");
  }
  console.log("Cartella creata");
});

// Metodo ASINCRONO per eliminare una cartella
fs.rmdir("./assets", (err, data) => {
  if (err) {
    console.error("Errore durante l'eliminazione della cartella");
  }
  console.log("Cartella eliminata");
});

// Verifica se la cartella "./assets" esiste
console.log(fs.existsSync("./assets"));

// Esegue operazioni avanzate in base all'esistenza della cartella
if (fs.existsSync("./assets")) {
  fs.rmdir("./assets", (err, data) => {
    if (err) {
      console.error("Errore durante l'eliminazione della cartella");
    }
    console.log("Cartella eliminata");
  });
} else {
  fs.mkdir("./assets", (err, data) => {
    if (err) {
      console.error("Errore durante la creazione della cartella");
    }
    console.log("Cartella creata");
  });
}

/* --------------------------------------------------------
              Utilizzo degli eventi personalizzati
-------------------------------------------------------- */

// Importa la classe EventEmitter dal modulo 'events'
const EventEmitter = require("events");

// Crea una nuova istanza di EventEmitter
const newEmitter = new EventEmitter();

// Registra un gestore per l'evento "hello"
newEmitter.on("hello", (name) => {
  if (name) {
    console.log("Hello", name);
  } else {
    newEmitter.emit("error", new Error("Il nome non è definito"));
  }
});

// Emette l'evento "hello" con l'argomento "mario"
newEmitter.emit("hello", "mario");

// Registra un gestore per l'evento "showNums"
newEmitter.on("showNums", (a, b) => {
  console.log("Risultato:", a + b);
});

// Emette l'evento "showNums" con gli argomenti 4 e 5
newEmitter.emit("showNums", 4, 5);

// Registra un gestore per l'evento "onRequest"
newEmitter.on("onRequest", () => {
  console.log("Richiesta ricevuta");
});

// Emette l'evento "onRequest"
newEmitter.emit("onRequest");

// Registra un gestore per l'evento "error"
newEmitter.on("error", (err) => {
  console.log(err);
});

// Emette l'evento "error"
newEmitter.emit("error");

/* --------------------------------------------------------
                  Utilizzo del modulo 'http'
-------------------------------------------------------- */

// Importa il modulo 'http'
const http = require("http");

// Definisce il numero di porta
const port = 3000;

// Crea un server HTTP che gestisce le richieste
const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  // Gestisce le richieste in base all'URL
  switch (req.url) {
    case "/":
      res.writeHead(200, { "content-type": "text/html" });
      res.end("<h1>Benvenuto nel mio sito</h1>");
      break;
    case "/contatti":
      res.writeHead(200, { "content-type": "text/html" });
      res.end("<h1>Contatti</h1>");
      break;
    case "/prodotti":
      res.writeHead(200, { "content-type": "application/json" });
      res.end("<h1>Prodotti</h1>");
      break;
    default:
      res.writeHead(404, { "content-type": "text/html" });
      res.end("<h1>Pagina non trovata</h1>");
      break;
  }
  /* 
  if (req.url === "/") {
    res.writeHead(200, { "constent-type": "text/html" });
    res.end("<h1>Benvenuto nel mio sito</h1>");
  } else if (req.url === "/contatti") {
    res.writeHead(200, { "constent-type": "text/html" });
    res.end("<h1>Contatti</h1>");
  } else if (req.url === "/prodotti") {
    res.writeHead(200, { "constent-type": "text/html" });
    res.end("<h1>Prodotti</h1>");
  } else {
    res.writeHead(404, { "constent-type": "text/html" });
    res.end("<h1>Page not found</h1>");
  } */
});

// Avvia il server sulla porta specificata
server.listen(port, () => {
  console.log(`Server in esecuzione sulla porta ${port}`);
});

