const knex = require('knex');
const connection = require('./connection.json');
const database = knex({
    client: 'mysql',
    connection
});
database.
raw("SELECT 1").
then(() => {
    console.log("database connected");
}).catch((e) => {
    console.log("database not connected");
    console.error(e);
});
module.exports=database