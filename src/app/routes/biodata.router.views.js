const express = require('express');
const {
  create,
  findAll,
  findOne,
  destroy,
  edit,
} = require('../controllers/biodata.controller.views');

const router = express.Router();

router.get('/biodata', findAll);
router.get('/biodata/:id', findOne);
router.post('/biodata', create);
router.put('/biodata/:id', edit);
router.delete('/biodata/:id', destroy);

module.exports = router;