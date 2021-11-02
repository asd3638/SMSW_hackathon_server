const express = require("express");
const { sequelize } = require('./models');
const app = express();
var port = 8080;

app.get("/", function (req, res) {
  res.send("Hello World");
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

  app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  });
  
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
  });


  app.listen(port, function () {
    console.log("server on! http://localhost:" + port);
  });


