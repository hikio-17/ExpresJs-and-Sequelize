const db = require('../models');

const Biodata = db.biodata;

// Create Biodata method
exports.create = async (req, res) => {
  try {
    const {
      name, place_birth, date_birth, address,
    } = req.body;

    if (!name || !place_birth || !date_birth || !address) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
      return;
    }

    // Create Biodata Object
    const biodata = {
      name,
      place_birth,
      date_birth,
      address,
    };
    // Save Biodata to database
    await Biodata.create(biodata);

    res.status(201).redirect('/api/views/biodata');
  } catch (err) {
    res.status(500).send({
      message: 'Error occured while inserting biodata.',
    });
  }
};

// Retrive all Biodata from the database.
exports.findAll = async (req, res) => {
  try {
    const biodata = await Biodata.findAll();

    res.render('biodata', {
      biodata,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while retrieving biodata.',
    });
  }
};

// Find a single Biodata with an id
exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const biodata = await Biodata.findOne({
      where: {
        id,
      },
    });

    if (!biodata) {
      res.status(400).send({
        message: `Not found biodata with id ${id}`,
      });
      return;
    }

    res.render('editBiodata', {
      biodata,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Update a single Biodata with an id
exports.edit = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  try {
    // check the biodata is in the database or not
    const biodata = await Biodata.findOne({
      where: {
        id,
      },
    });

    if (!biodata) {
      res.status(400).send({
        message: `Can not update biodata with id '${id}'`,
      });
      return;
    }

    const newBiodata = {
      ...biodata,
      ...req.body,
    };

    // if there is a biodata update
    await Biodata.update(newBiodata, {
      where: {
        id,
      },
    });

    res.send('success');
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;

    // check the biodata is in the database or not
    const biodata = await Biodata.findOne({
      where: {
        id,
      },
    });

    if (!biodata) {
      res.status(400).send({
        message: `Can not delete biodata with id '${id}'`,
      });
      return;
    }

    // if there is a biodata destroy
    await Biodata.destroy({
      where: {
        id,
      },
    });

    res.status(200).redirect('/api/views/biodata');
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};