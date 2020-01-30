//This file has all the inventory routes

const express = require('express');
const router = express.Router();
const inv_controller = require('./../controllers/inv_cotroller');

router
.route('/')
.get(inv_controller.get_all_invs)
.post(inv_controller.create_inv)

router
.route('/:id')
.get(inv_controller.get_single_inv)
.patch(inv_controller.update_inv)
.delete(inv_controller.delete_inv);

module.exports = router;
