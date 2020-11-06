const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

//Mysql 
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Milanesaq7',
    database: 'node_mysql'
  });

//routes

app.get('/', (req, res) => {
    res.send('welcome to my api')
})

//all clientes
app.get('/customers', (req, res) => {
    
    const sql = 'SELECT * FROM customers'

    connection.query(sql, (error, result) => {
        if(error) throw error
        if(result.length>0){
            res.json(result)
        }else{
            res.send('No customers found.')
        }
    })

})

app.get('/customers/:id', (req, res) => {
    
    const {id} = req.params
    const sql = `SELECT * FROM customers WHERE id=${id}`

    connection.query(sql, (err, result)=>{
        if(err) throw error;
        if(result.length >0){
            res.json(result)
        }else{
            res.send('No customers found.')
        }
    })

})

app.post('/add', (req, res) => {
   
    const sql = 'INSERT INTO customers set ?'
    const customerObj = {
        name: req.body.name,
        city: req.body.city
    }

    connection.query(sql, customerObj, error => {
        if (error) throw error
        res.send('Customer successfully')
    })

})

app.put('/update/:id', (req, res)=>{

    const {id} = req.params
    const {name, city} = req.body
    const sql = `UPDATE customers SET name= '${name}', city = '${city}' where id=${id}`

    connection.query(sql, error =>{
        if (error) throw error
        res.send('Customer updated successfully')
    })
})




//Delete a customer
app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params
    const sql = `DELETE FROM customers WHERE id = ${id}`

    connection.query(sql, error => {
        if(error) throw error
        res.send('Customer deleted successfully')
    })
})




connection.connect(error => {
      if(error) throw error;
      console.log('database connect')
  })

  app.listen(PORT, () => console.log(`database server listening ${PORT}`))