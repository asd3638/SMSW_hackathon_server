var mysql = require("mysql"); // sql 모듈 불러오기 

// 커넥션 정의 
var connection = mysql.createConnection({
    host: "smwu-hackathon.czyov59wpw7q.us-east-2.rds.amazonaws.com",
    user: "nunsong",
    password: "12341234",
    database: "smwu"
});

// RDS에 접속
connection.connect(function(err) {
    if (err) {
        throw err; // 접속 실패 시 에러 throw
    } else {
        /* 접속하면 쿼리 보내기
        connection.query("SELECT * FROM USER", function(err, rows, field){
            console.log(rows); // 결과 출력
        });
        */
        console.log("**********************\nDB 연결 완료\n**********************");
    }
});