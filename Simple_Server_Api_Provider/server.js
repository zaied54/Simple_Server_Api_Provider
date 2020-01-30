//entry point of the app
// This file has server initiation and databased connection 
//code

const mongoose = require('mongoose');

//configurations to access mongodb remote cluster
const PASSWORD="Operation@101";
const DATABASE="mongodb+srv://zaied:<PASSWORD>@cluster0-q8fb4.mongodb.net/invs?retryWrites=true&w=majority";
const DB = DATABASE.replace('<PASSWORD>',PASSWORD);

mongoose.connect(DB,{
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(con => {
	//console.log(con.connections);
	//console.log("succes");
});

const app = require('./app')
const port = 3000;
app.listen(port,()=>{
	//console.log("i'm here");
});
