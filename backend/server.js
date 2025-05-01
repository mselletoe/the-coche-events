// const express = require('express');
// const mysql = require('mysql2');
// // const cors = require('cors');
// const app = express();
// const port = 5000; 
// // app.use(cors());

// // Set up MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',      // MySQL host
//   user: 'root',           // MySQL username
//   password: '',           // MySQL password
//   database: 'ph-subnatadmin_db' // Database name
// });

// // Connect to MySQL
// db.connect(err => {
//   if (err) throw err;
//   console.log('Connected to the database');
// });

// // API endpoint to get regions
// app.get('/api/regions', (req, res) => {
//   db.query('SELECT * FROM regions', (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// // API endpoint to get provinces by region
// app.get('/api/provinces', (req, res) => {
//   const regionId = req.query.region_id;
//   db.query('SELECT * FROM provinces WHERE region_id = ?', [regionId], (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// // API endpoint to get cities by province
// app.get('/api/cities', (req, res) => {
//   const provinceId = req.query.province_id;
//   db.query('SELECT * FROM cities WHERE province_id = ?', [provinceId], (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// // API endpoint to get barangays by city
// app.get('/api/barangays', (req, res) => {
//   const cityId = req.query.city_id;
//   db.query('SELECT * FROM barangays WHERE city_id = ?', [cityId], (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });