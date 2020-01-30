const mongoose = require('mongoose');

// inv_schema to store inventory items
const inv_schema = new mongoose.Schema({
	name : {
		type: String,
		required:[true,'must have a name'],	
	},
	description: {
		type: String,
		required: [true, 'must have a description']
	},
	price: {
		type: Number,
		required: [true, 'must have a price']
	},
	quantity: {
		type: Number,
		required: [true, 'must have a quantity']
	}
});
const inv_model = mongoose.model('inv_model',inv_schema);
module.exports = inv_model;