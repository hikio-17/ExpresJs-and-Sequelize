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
    const newBiodata = await Biodata.create(biodata);

    res.status(201).send(newBiodata);
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

    res.send(biodata);
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

    res.send(biodata);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Update a single Biodata with an id
exports.edit = async (req, res) => {
  const { id } = req.params;
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

    res.send({
      message: 'Success update your biodata!',
    });
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

    res.send({
      message: `Success delete biodata with id ${id}!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};