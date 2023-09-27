const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


//   // find all categories
//   // be sure to include its associated Products

router.get('/', async (req, res) => {
  try {
    const dataForCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(!dataForCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});


//   // find one category by its `id` value
//   // be sure to include its associated Products


router.get('/:id', async (req, res) => {
  try {
    const dataForCategories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!dataForCategories) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(!dataForCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});


//   // create a new category

router.post('/', async (req, res) => {
  try {
    const dataForCategories = await Category.create({
      category_id: req.body.category_id,
    });
    res.status(200).json(!dataForCategories);
  } catch (err) {
    res.status(400).json(err);
  }
});

//   // update a category by its `id` value

router.put('/:id', async (req, res) => {
  try {
    const dataForCategories = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!dataForCategories) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }
    res.status(200).json(!dataForCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.delete('/:id', (req, res) => {
//   // delete a category by its `id` value
// });
router.delete('/:id', async (req, res) => {
  try {
    const dataForCategories = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dataForCategories) {
      res.status(404).json({ message: 'Found no Category with that id!' });
      return;
    }

    res.status(200).json(!dataForCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
