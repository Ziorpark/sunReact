const express = require("express");
const path = require("path");
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 4000; // 서버 포트


//////////////////////////////////////////////// 서버 설정 ////////////////////////////////////////////////////////

// CORS 설정: 특정 출처들을 허용
const corsOptions = {
  origin: ['http://localhost:3003', 'http://localhost:4000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));

// React 애플리케이션의 정적 파일 제공
app.use(express.static(path.join(__dirname, 'build')));

//////////////////////////////////////////////// 서버 설정 ////////////////////////////////////////////////////////

//////////////////////////////////////////////// DB 코드 ////////////////////////////////////////////////////////

// MySQL 데이터베이스 연결 설정
const connection = mysql.createPool({
  connectionLimit: 10, //최대 연결 수를 설정
  host: '121.135.133.205',
  user: 'SPSR',
  password: '0000',
  database: 'spsrenergy'
});

/*
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id', connection.threadId);
});
*/

// 연결 풀에서 연결을 가져오는 함수
connection.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id', connection.threadId);

  // 여기서부터는 해당 연결(connection)을 사용하여 쿼리를 실행할 수 있음

  // 연결 사용이 끝나면 반드시 연결을 반환해야 함
  connection.release();
});

// 애플리케이션이 종료될 때 모든 연결을 해제
process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      return console.error('Error closing MySQL pool:', err.stack);
    }
    console.log('MySQL pool closed');
    process.exit(0);
  });
});

// 간단한 API 엔드포인트 예제
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM tb_country';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

//1. 테스트
app.get('/api/chipdata', (req, res) => {
  const spsrNum = req.query.spsrNum; 
  console.log(`Received request for spsrNum: ${spsrNum}`);

  if (!spsrNum) {
    console.error('spsrNum is missing');
    res.status(400).json({ error: 'spsrNum is missing' });
    return;
  }

  //2. 사용자가 선택한 보드의 정보
  const query = 'SELECT * FROM tb_spsrenergy WHERE SpSerialNum = ? LIMIT 1';
  connection.query(query, [spsrNum], (err, results) => {
    if (err) {
      console.error('Error fetching chipdata:', err.stack);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    console.log('Data fetched from DB:', results);
    res.json(results);
  });
});


//3. 해당 보드 탄소배출 절감량
app.get('/api/now_reduce', (req, res) => {
  const spsrNum = req.query.spsrNum; 
  console.log(`Received request for now_reduce: ${spsrNum}`);

  if (!spsrNum) {
    console.error('spsrNum is missing');
    res.status(400).json({ error: 'spsrNum is missing' });
    return;
  }
  // 24.07.10 - 현재 테스트 데이터 마지막 날짜를 넣었음. now()로 변경 요망
  const query = 'SELECT SUM(Co2RedAmt) AS TotalCo2RedAmt FROM tb_spsrenergy '+
                'WHERE DayTime > DATE_ADD("2024-05-28 07:09:31", INTERVAL -1 HOUR) AND SpSerialNum = ?';

  connection.query(query, [spsrNum], (err, results) => {
    if (err) {
      console.error('Error fetching now_reduce data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }
    console.log('Data fetched from DB about now_carbon_reduce:', results);
    if (results.length > 0 && results[0].TotalCo2RedAmt !== null) {
      res.json(results[0].TotalCo2RedAmt); // 필요한 데이터만 클라이언트로 보냄
    } else {
      res.status(404).json({ error: 'No data found' });
    }
  });
});


// 4. 전체 보드 탄소배출 절감량
app.get('/api/all_reduce', (req, res) => {
  // 24.07.10 - 현재 테스트 데이터 마지막 날짜를 넣었음. now()로 변경 요망
  const query = 'SELECT SUM(Co2RedAmt) AS TotalCo2RedAmt FROM tb_spsrenergy ' + 
                'WHERE DayTime > DATE_ADD("2024-05-28 07:09:31", INTERVAL -1 HOUR);';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching all_reduce data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }
    console.log('Data fetched from DB about all_carbon_reduce:', results);
    if (results.length > 0) {
      res.json(results[0].TotalCo2RedAmt); // 필요한 데이터만 클라이언트로 보냄
      //res.json(results);
    } else {
      res.status(404).send('No data found');
    }
  });
});

// 모든 기타 요청은 React 애플리케이션의 index.html 파일을 반환
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//////////////////////////////////////////////// DB 코드 ////////////////////////////////////////////////////////