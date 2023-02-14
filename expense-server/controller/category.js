const Category = require("../models/category");


exports.getCategories = async (req, res) => {
  try {
    if (!req.body.category_type) {
      return res
        .status(200)
        .send({ error: true, message: "Send category_type" });
    }
    await Category.find({
      category_type: req.body.category_type,
      $sort: { category_type: -1 },
    })
      .then((doc) => {
        console.log("Category List", doc);
        return res
          .status(200)
          .send({ error: false, message: "Category List", categorys: doc });
      })
      .catch((err) => {
        console.log("Category fetch error", err);
        return res
          .status(500)
          .send({ error: true, message: "Category fetch failed", err });
      });
  } catch (errcatch) {
    console.log("fetchCategory", errcatch);
    return res.status(500).send({
      error: true,
      message: "Category fetch failed",
      err: errcatch,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
const categorys = await Category.find().sort({category_type: -1});
    return res.send({
      error: false,
      message: "Category fetched sucessfully",
      categorys,
    });
  } catch (errcatch) {
    console.log("fetchCategory", errcatch);
    return res.status(500).send({
      error: true,
      message: "Category fetch failed",
      err: errcatch,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const categoryData = {
      category_name: req.body.category_name,
      category_type: req.body.category_type,
    };
    console.log("createCategory", categoryData);
    // to insert the record into mongodb
    const category = new Category(categoryData);
    await category
      .save(categoryData)
      .then((doc) => {
        console.log("Category created successfully", doc);
        res.status(200).send({ error: false, message: "Category created" });
      })
      .catch((err) => {
        console.log("Category add error", err);
        return res
          .status(500)
          .send({ error: true, message: "Category Creation failed", err });
      });
  } catch (errcatch) {
    console.log("createCategory", errcatch);
    return res.status(500).send({
      error: true,
      message: "Category Creation failed",
      err: errcatch,
    });
  }
};
