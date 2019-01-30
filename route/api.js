const app = require("express").Router();

app.get("/", (req, res) => {
  var fs = require("fs");
  var root = "./public";
  function getAllFiles(root) {
    let resFile = [],
      files = fs.readdirSync(root);
    files.forEach(function(file) {
      var pathname = root + "/" + file,
        stat = fs.lstatSync(pathname);

      if (!stat.isDirectory()) {
        console.log(pathname.split(".")[1].toLowerCase());
        pathname !== "./public/index.html" &&
          pathname.split(".")[2].toLowerCase() === "html" &&
          resFile.push(pathname.replace("./public", "."));
      } else {
        resFile = resFile.concat(getAllFiles(pathname));
      }
    });
    return resFile;
  }
  res.end(JSON.stringify(getAllFiles(root)));
});

module.exports = app;
