import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
// import * as fs from "node:fs";

dotenv.config(); // Load environment variables
const PORT = process.env.PORT || 3000;
// const options = {
//     key: fs.readFileSync('privateKey.key'),
//     cert: fs.readFileSync('certificate.crt')
// };
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

http.createServer(app).listen(PORT);