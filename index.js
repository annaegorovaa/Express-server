const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

   if (req.method === 'OPTIONS') {
       res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
       return res.status(200).json({});
   }
   next();
});

let todoList = [
    {
        title: "first",
        done: true,
        date: Date.now()
    },
    {
        title: "second",
        done: false,
        date: Date.now()
    }
];

app.get('/', (req, res) => {
    res.status(200).json(todoList);
});

app.post('/', (req, res) => {
    todoList.push(req.body);
    res.status(201).json({message: 'OK'});
});

app.delete('/', (req, res) => {
    todoList = todoList.filter(e => e.title !== req.body.title);
    res.status(200).json({message: 'Deleted'});
});

app.patch('/', (req, res) => {
    todoList[req.body.data.index] = req.body.data;
    res.status(200).json({message: 'Updated'});
});

app.listen(5000, () => console.log('listen 5000'));