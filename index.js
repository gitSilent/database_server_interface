import express, { json } from "express";
const app = express();
import { createConnection, createPool } from 'mariadb';

app.use(json())

const pool = createPool({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'library1234',
});


app.get("/", async(req, res) => {
    let connection = await pool.getConnection();
    const response = await connection.query('SELECT * from authors', (err, data) => {
        console.log(data)
    })
    // console.log(response)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
    res.send(response)
    
})


app.post("/", (req, res) => {
    pool.query("insert into authors values(0, \"Ф.М.Достоевский\", \"1821-11-11\")", function(err, results) {
        pool.release()
    if(err) console.log(err);
    console.log(results);
    return(results)
    });
})

// mysql.format()

app.listen(4000, () => {
console.log('Server is running at port 4000');
});