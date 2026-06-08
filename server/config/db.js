import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TU.cruzeiro2',
  database: 'myapp'
});

connection.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }

  console.log('MySQL connected');
});

export default connection;