// records database model and schema
const mongoose = require('mongoose');

// rec_schema to store records
const rec_schema = new mongoose.Schema({
	cust_email_add : {
		type: String,
		required:[true,'must have a email'],
		unique: true
		
	},
	order_date: {
		type: Date,
		default: (new Date().toISOString())
	},
	order_status: {
		type: String,
		required: [true, 'must have a status']
	},
	order_items: {
		type: String,
		required: [true, 'must have an item'],
		immutable: true
	},
	order_quant: {
		type: Number,
		required: [true, "must have a quant"],
		immutable: true
	}
	
});
const rev_model = mongoose.model('rev_model',rec_schema);
module.exports = rev_model;