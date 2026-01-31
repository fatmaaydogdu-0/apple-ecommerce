const Product = require("../models/product");
const Category = require("../models/category");

// ADMIN HOME
exports.admin_home = (req, res) => {
  res.status(302).redirect("/admin/products");
};

// ÜRÜN LİSTESİ
exports.get_products = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: 
      [{ model: Category,
         as: "Category" }]
    });

    res.status(200).render("admin/productList", {
      title: "Ürünler",
      products,
      action: req.query.action
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Sunucu hatası");
  }
};

// ÜRÜN OLUŞTUR 
exports.get_product_create = async (req, res) => {
  try {
    const categories = await Category.findAll({ 
      order: [["name", "ASC"]]
     });

    res.status(200).render("admin/productCreate", {
      title: "Ürün Oluştur",
      categories
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Sunucu hatası");
  }
};


exports.post_product_create = async (req, res) => {
  try {
    const { name, price, brand } = req.body;
    const categoryId = req.body.categoryId || req.body.category_id;

    if (!categoryId) {
      return res.status(400).send("Kategori zorunludur.");
    }

    const image = req.file
      ? `/static/images/${req.file.filename}`
      : null;

    await Product.create({
      name,
      price,
      brand,
      image,
      categoryId: Number(categoryId)
    });

    res.status(302).redirect("/admin/products?action=create");
  } catch (err) {
    console.log(err);
    res.status(500).send("Sunucu hatası");
  }
};

// ÜRÜN DÜZENLE
exports.get_product_edit = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).redirect("/admin/products");
    }

    const categories = await Category.findAll
    ({ order: [["name", "ASC"]] });

    res.status(200).render("admin/productEdit", {
      title: "Ürün Düzenle",
      product,
      categories
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Sunucu hatası");
  }
};


exports.post_product_edit = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).redirect("/admin/products");
    }

    const { name, price, brand } = req.body;
    const categoryId = req.body.categoryId || req.body.category_id;
    const image = req.file
      ? `/static/images/${req.file.filename}`
      : product.image;

    await product.update({
      name,
      price,
      brand,
      image,
      categoryId: categoryId ? Number(categoryId) : null
    });

    res.status(302).redirect("/admin/products?action=edit");
  } catch (err) {
    console.log(err);
    res.status(500).send("Sunucu hatası");
  }
};

// ÜRÜN SİL
exports.post_product_delete = async (req, res) => {
  try {
    await Product.destroy({
       where: { id: req.params.id }
       });
    res.status(302).redirect("/admin/products?action=delete");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
