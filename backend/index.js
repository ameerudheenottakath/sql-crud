import  express  from "express";
import  mysql from 'mysql'
import cors from 'cors'
import multer from 'multer'


const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: './uploads/' })

app.post('/upload', upload.single('file'), function (req, res) {
  res.status(200).json ("Image has been uploaded..")
})

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Ameer123",
  database: "test",
  authPlugin: 'mysql_native_password'
});

app.get("/", (req, res) => {
  res.json("hello Ameer");
});

app.get("/books", (req, res) => {
  const q = "select * from books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post('/books',(req,res)=>{
    const q = "insert into books(`title`,`desc`,`price`,`cover`)values (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover

    ]
    db.query(q,[values],(err,data)=>{
        if (err) {
            return res.json(err);
          }
        return res.json("Book has been created successfully");
    })
})

app.delete('/books/:id',(req,res)=>{
  const bookId = req.params.id;
  const q = "delete from books where id = ?"

  db.query(q,[bookId],(err,data)=>{
    if (err) {
      return res.json(err);
    }
  return res.json("Book has been deleted successfully");
  })
})

app.put('/books/:id',(req,res)=>{
  const bookId = req.params.id;
  const q = "update books set `title`=?,`desc`=?, `price`=?,`cover`=? where id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover
]

  db.query(q,[...values,bookId],(err,data)=>{
    if (err) {
      return res.json(err);
    }
  return res.json("Book has been updated successfully");
  })
})


app.listen(8000,()=>{
    console.log("Connected to Server..")
})