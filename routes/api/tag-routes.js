const router = require('express').Router();
const { Tag, Product} = require('../../models');

// The `/api/tags` endpoint


//   // find all tags
//   // be sure to include its associated Product data

router.get('/', async (req, res) => {
  try {
    const dataForTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(dataForTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

//   // find a single tag by its `id`
//   // be sure to include its associated Product data

router.get('/:id', async (req, res) => {
  try {
    const dataForTags = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!dataForTags) {
      res.status(404).json({ message: 'Found no Tag with that id!' });
      return;
    }

    res.status(200).json(dataForTags);
  } catch (err) {
    res.status(500).json(err);
  }
});


//   // create a new tag

router.post('/', async (req, res) => {
  try {
    const dataForTags = await Tag.create({
      category_id: req.body.category_id,
    });
    res.status(200).json(dataForTags);
  } catch (err) {
    res.status(400).json(err);
  }
});


//   // update a tag's name by its `id` value

router.put('/:id', async (req, res) => {
  try {
    const dataForTags = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!dataForTags) {
      res.status(404).json({ message: 'Found no Tag with that id!' });
      return;
    }
    res.status(200).json(dataForTags);
  } catch (err) {
    res.status(500).json(err);
  }
});


//   // delete on tag by its `id` value

router.delete('/:id', async (req, res) => {
  try {
    const dataForTags = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dataForTags) {
      res.status(404).json({ message: 'Found no Tag with that id!' });
      return;
    }

    res.status(200).json(dataForTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
