const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
app.use(morgan("tiny"));
const people = require("./static/data");
const { writeFile, readFile } = require("fs");
const { json } = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));

var iData = 0;
readFile(path.resolve(__dirname, "Indata.json"), (err, res) => {
  iData = JSON.parse(res);
});


app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
app.get("/get.html", (req, res) => {
  res.sendFile(path.resolve(__dirname, "get.html"));
});



app.post("/login", (req, res) => {
  const testing = req.body;
  console.log(testing);
  if (testing) {
    if (iData.find((x) => x.Student === testing.Student)) {
      return res
        .status(200)
        .send({
          Value: `Name Must be different so go back and fill the for again`,
        });
    } else {
      iData.push(testing);
      writeFile(
        path.resolve(__dirname, "Indata.json"),
        JSON.stringify(iData),
        { flag: "w" },
        (err) => {
          console.log("No", err);
        }
      );
    }
    return res.status(200).redirect("/");
  }
  console.log("no body", req.body);
});


app.post("/getData", (req, res) => {
     const name=req.body.unique 
     if (found=iData.find((x) => x.Student === name)) {
        return res.status(200).json(found);
      }  
      else
      res.send("we have not found any!!")

      console.log(req.body);
      
});

app.listen(5000, () => {
  console.log("Server is listeninng on port 5000...");
});
console.log(path.resolve(__dirname, "../static"));
