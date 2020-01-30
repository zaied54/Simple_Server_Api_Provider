//deals with all records routes

const express = require('express');
const rec_controller = require('./../controllers/rec_controller');

const router = express.Router();

router.route('/')
.get(rec_controller.get_all_recs)
.post(rec_controller.create_rec);

router.route('/:id')
.get(rec_controller.get_single_rec)
.patch(rec_controller.update_rec)
.delete(rec_controller.delete_rec);

module.exports = router;
