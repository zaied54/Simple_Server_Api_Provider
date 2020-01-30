//This file contains all inventory route handlers

const inv_model = require('./../models/inv_models'); 

// get all inventory items
exports.get_all_invs = async (req,res) => {
	//console.log("inside");
	try{
		const all_invs = await inv_model.find();
		res.status(200).json({
			status: 'success',
			results: all_invs.length,
			data: {
				all_invs
			}
		})
	}catch (err){
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
}

//create an inventory item based on given value in req.body
exports.create_inv = (req,res)=>{
	const req_obj = req.body;
	const name = req_obj["name"];
	const description = req_obj["description"];
	const price = req_obj["price"];
	const quantity = req_obj["quantity"];
	const new_inv_data = new inv_model({
		name: name,
		description: description,
		price: price,
		quantity: quantity
	});
	new_inv_data.save().then(doc => {
		console.log(doc);
	}).catch(err=>{
		console.log('Error',err);
	});
	res.send('Done');
}

// get a single inventory item based on the id given in url
exports.get_single_inv = async(req,res)=>{
	try{
		const id = req.params.id;
		//console.log(typeof(id));
		//console.log(id);
		const invs = await inv_model.findById(id);
		//do if not found
		console.log(invs)
		//search database
		//const x = 10;
		res.status(200).json({
			status: 'success',
			data: {
				invs
			}
		});
	}catch (err){
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
}

// update a field of an item based on given item id in url and value given in req.body
exports.update_inv = async(req,res)=>{
	try{
		console.log(req.body);
		const updated_inv = await inv_model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		console.log(updated_inv);
		res.status(200).json({
			status: 'success',
			data: {
				updated_inv
			}
		});
	}
	catch (err){
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
}

//delete an inventory item based on the id given in url
exports.delete_inv = async (req,res) => {
	try{
		await inv_model.findByIdAndDelete(req.params.id);
		res.status(204).json({
		});
	}
	catch (err){
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
}

