const express = require("express"); // Server buradan sorulur.
const bodyParser = require("body-parser"); // HTML dosyalarındaki parçaları çekiyoruz.

const date = require(__dirname + "/date.js"); //bazı işlemleri farklı bir dosyada yapıp modülarize edip buraya çağırdık.


app = express(); // Serverla ilgili işlemleri yapacağımız bir obje.

app.set('view engine', 'ejs'); //EJS Templateleri yaratıp kullanabilmek için yaptık.

app.use(bodyParser.urlencoded({extended: true})); //bodyparserı kullan diyürüz.

app.use(express.static("public")); //server'ın css ve imageları kullanmasını sağlıyor.

let items = [];
let workItems = [];


app.get("/", function(req, res) { // ana sayfa - landing -- browser request gönderiyor. aşağıdaki kodlar da bizim cevap

  let day = date.getDate();

  res.render('list', {listTitle: day, newListItems: items});
});

app.post("/", function(req, res) { // ana sayfadan (yani buradan --> "/") bize bi post gelirse, aşağıdaki kodlar bizim cevap.

  let item = req.body.newItem
  if (req.body.list === "Work") {
    workItems.push(item);
    console.log(item)
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work", newListItems: workItems});
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

//------ABOUT
app.get("/about", function(req, res) {
  res.render("about");
});


//----
//Server başlatıcı
app.listen(3000, function() {
  console.log("Server is running on port 3000...");
});
