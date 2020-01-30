// This file has all the record(order) route handlers

const rev_model = require('./../models/rec_models');
const inv_model = require('./../models/inv_models')

// get all records
exports.get_all_recs = async(req,res)=>{
	try{
		const all_recs = await rev_model.find();
		res.status(200).json({
			status: 'success',
			results: all_recs.length,
			data: {
				all_recs
			}
		})
	}catch (err){
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
}

//create a single record based on the values given in req.body
//also decrement the corresponding inventory item quantity
//based on the order_items field in the record
exports.create_rec = async(req,res)=>{
	const req_obj = req.body;
	const email = req_obj["cust_email_add"];
	const date = req_obj["order_date"];
	const status = req_obj["order_status"]
	const item = req_obj["order_items"];
	const quant = req_obj["order_quant"];
	//console.log(name);
	const new_rec_data = new rev_model({
		cust_email_add: email,
		order_date: date,
		order_status: status,
		order_items: item,
		order_quant: quant
	});
	new_rec_data.save().then(doc => {	
	}).catch(err=>{
		console.log('Error',err);
	});
	res.send('Done');
	const items = await inv_model.findById(item);
	if(items){
		var curr_quant = items["quantity"];
		curr_quant = curr_quant*1 - quant*1;
		update_quant = { "quantity": curr_quant};
		const updated_inv = await inv_model.findByIdAndUpdate(item, update_quant, {
			new: true,
			runValidators: true
		});
		console.log(updated_inv);
	}
}

//get single record based on the id given in url
exports.get_single_rec = async (req,res)=>{ 
	//console.log(req.params);
	try{
		const id = req.params.id;
		//console.log(typeof(id));
		//console.log(id);
		const revs = await rev_model.findById(id);
		//do if not found
		console.log(revs)
		//search database
		//const x = 10;
		res.status(200).json({
			status: 'success',
			data: {
				revs
			}
		});
	}catch (err){
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};

//update a record based on the id given in url and values given
//in req.body
exports.update_rec = async (req,res)=>{
	try{
		const updated_rev = await rev_model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		console.log(updated_rev);
		res.status(200).json({
			status: 'success',
			data: {
				updated_rev
			}
		});
	}
	catch (err){
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};

//delete a record based on the id given in url
exports.delete_rec = async (req,res)=>{
	try{
		const deleted_rec = await rev_model.findById(req.params.id);
		var del_itm = deleted_rec["order_items"];
		try{
			const that_itm  = await inv_model.findById(del_itm);
			var qty = that_itm["quantity"];
			qty = qty*1 + deleted_rec["order_quant"]*1;
			const update_qty = {"quantity": qty};
			console.log(qty);
			const updated_inv = await inv_model.findByIdAndUpdate(del_itm, update_qty, {
				new: true,
				runValidators: true
			});
		}catch(err){
		}
		finally{
			await rev_model.findByIdAndDelete(req.params.id);
			res.status(204).json({
			});
		}
	}
	catch (err){
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};