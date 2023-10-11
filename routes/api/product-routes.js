const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// // get all products

//   // find all products
//   // be sure to include its associated Category and Tag data

router.get('/', async (req, res) => {
  try {
    const dataForProducts = await Product.findAll({
      include: [{ model: Category }],
      include: [{ model: Tag }],
    });
    res.status(200).json(dataForProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // get one product
//   // find a single product by its `id`
//   // be sure to include its associated Category and Tag data

router.get('/:id', async (req, res) => {
  try {
    const dataForProducts = await Product.findByPk(req.params.id, {
      include: [{ model: Product }],
      include: [{ model: Tag }],
    });

    if (!dataForProducts) {
      res.status(404).json({ message: 'Found No Product with that id!' });
      return;
    }

    res.status(200).json(dataForProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
//   /* req.body should look like this...
//     {
//       product_name: "Basketball",
//       price: 200.00,
//       stock: 3,
//       tagIds: [1, 2, 3, 4]
//     }

router.post('/', async (req, res) => {
  // try {
  //   const dataForProducts = await Product.create({
  //     product_id: req.body.product_id,
  //   });
  //   res.status(200).json(dataForProducts);
  // } catch (err) {
  //   res.status(400).json(err);
  // }
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const dataForProducts = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(dataForProducts);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });

// update product
  router.put('/:id', async (req, res) => {
    try {
      const dataForProducts = await Product.update(req.body, {
        where: {
          id: req.params.id,
        }
      });
      if (!dataForProducts) {
        res.status(404).json({ message: 'Found no Tag with that id!' });
        return;
      }
      res.status(200).json(dataForProducts);
    } catch (err) {
      res.status(500).json(err);
    }
  });



//   // delete one product by its `id` value

router.delete('/:id', async (req, res) => {
  try {
    const dataForProducts = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dataForProducts) {
      res.status(404).json({ message: 'Found no Product with that id!' });
      return;
    }

    res.status(200).json(dataForProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
