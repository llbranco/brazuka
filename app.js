const express = require("express");
const server = new express();
const port = process.env.PORT || 5000;
const path = require("path");
const node = require('node-cron');
const axios = require("axios");
const sql = require(path.join(__dirname, "./snippets/ps"));

validatesetting()
function validatesetting(){

  if (!process.env.WEBSITE_PASSWORD){
    console.log("WEBSITE_PASSWORD is not set");
    throw new Error("WEBSITE_PASSWORD is not set");
    process.exit(1)
  }
  
  if (!process.env.OWNER_NUMBER){
    console.log("OWNER_NUMBER is not set");
    throw new Error("OWNER_NUMBER is not set");
    process.exit(1)
  }

  if (!process.env.HOSTING_PLATFORM){
    console.log("HOSTING_PLATFORM is not set");
    throw new Error("HOSTING_PLATFORM is not set");
    process.exit(1)
  }

}




require(path.join(__dirname, "./snippets/config"));
//console.clear();
const {
  main,
  logout,
  stop,
  isconnected,
} = require(path.join(
  __dirname,
  "./events/events.js"
));
let urldata =undefined;

node.schedule("*/15 * * * *", () => {
  try {
    axios.get(urldata).then((res) => {
      console.log("####################");

      console.log("called- ", urldata);
      
    }
    ).catch((err) => {
      sql.query('select * from botdata;').then(res => {
        console.log("-------------------------");
        console.log(res.rows[0]);
        urldata = res.rows[0].boturl;
      });
    });
  } catch (error) {
    
  }
})

node.schedule("0 */24 * * *", () => {
 
  sql.query('UPDATE groupdata SET totalmsgtoday=0;')
     sql.query('UPDATE botdata SET totalmsgtoday=0;')
    sql.query('UPDATE messagecount SET totalmsgtoday=0,dailylimitover=false;')
   
})

server.use(express.static(path.join(__dirname, "./public")));

server.listen(port, () => {
  //console.clear();
  console.log("\nRunnning on http://localhost:" + port);
});
server.use(
  express.urlencoded({
    extended: true,
  })
);


server.get("/", (req, res) => {
  res.sendFile("index.html");
});

server.get("/login", async (req, res) => {
  main();
  qqr = await sql.query("SELECT to_regclass('auth');")
  if (qqr.rows[0].to_regclass == "auth")
  {
    let qwer = await sql.query("SELECT * FROM auth;");
    auth_row_count = await qwer.rowCount;
    if (auth_row_count == 0) {
      res.send("absent")
      
    }
    else res.send("present")
  }
  else res.send("absent")

});

server.get("/logout", async (req, res) => {
  logout();
  autoconnect = false;
  res.send("1")
});


server.get("/stop", async (req, res) => {
  console.log("stop");
  autoconnect = false;
  stop();
  res.send("1")
});


server.get("/qr", async (req, res) => {
  console.log("sendig qr to browser");
  res.send('qr.png')
});


server.post("/sql", async (req, res) => {
  console.log("query - " + req.body.query);
  sql
    .query(req.body.query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err);
    });
});


server.post("/auth", async (req, res) => {
  console.log('siteurl', req.body.siteurl);
  sql.query(`UPDATE botdata SET boturl='${req.body.siteurl}';`)
  if (req.body.pass != process.env.WEBSITE_PASSWORD) {
    console.log(false);
    res.send("false");
  } else {
    console.log(true);
    res.send("true");
    console.log("sent");
  }
});


server.get("/restart", async (req, res) => {
  process.exit(0);
});



server.get("/isconnected", async (req, res) => {
  let state = await isconnected()
  console.log("server is sending connection state - " + state);
  if (state == "close") res.send("close")
  else if (state == "connecting") res.send("connecting")
  else if (state == "open") res.send("open")

});

server.get("/isauthenticationfilepresent", async (req, res) => {
  qqr = await sql.query("SELECT to_regclass('auth');")
  if (qqr.rows[0].to_regclass == "auth") {
    let qwer = await sql.query("SELECT * FROM auth;");
    auth_row_count = await qwer.rowCount;
    if (auth_row_count == 0) {
      res.send("absent")

    }
    else res.send("present")
  }
  else res.send("absent")
});

process.on('uncaughtException', err => console.log(err));