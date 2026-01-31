const Product = require("../models/product");
const Category = require("../models/category");
const { Op } = require("sequelize");

// ANASAYFA
exports.homepage = async (req, res) => {
  try {
    const products = await Product.findAll({ 
      limit: 12
     });
    const categories = await Category.findAll({
       order: [["name", "ASC"]] 
      });

    res.status(200).render("index", {
      title: "Ana Sayfa",
      products,
      categories
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// TÜM ÜRÜNLER
exports.productsList = async (req, res) => {
  try {
    const { brand, category, page } = req.query;

    const currentPage = page ? Number(page) : 1;
    const limit = 9;
    const offset = (currentPage - 1) * limit;

    const where = {};

    if (brand) {
      where.brand = brand;
    }

    if (category) {
      where.categoryId = category;
    }

    const { rows: products, count } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    const brands = await Product.findAll({
      attributes: ["brand"],
      group: ["brand"],
    });

    const categories = await Category.findAll({
      order: [["name", "ASC"]],
    });

    const totalPages = Math.ceil(count / limit);

    let queryString = "";

    if (brand) {
      queryString += `&brand=${brand}`;
    }

    if (category) {
      queryString += `&category=${category}`;
    }
// Breadcrumb
    let selectedCategoryName = null;

    if (category) {
      const selected = categories.find(c => c.id == category);
      if (selected) {
        selectedCategoryName = selected.name;
      }
    }

    res.status(200).render("users/products", {
      title: "Ürünler",
      products,
      brands,
      categories,
      selectedBrand: brand || "",
      selectedCategory: category || "",
      selectedCategoryName, 
      totalItems: count,
      currentPage,
      totalPages,
      queryString,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Bir hata oluştu");
  }
};

// ÜRÜN DETAY
exports.productDetail = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: 
      [{ model: Category,
         as: 'Category', 
         attributes: ['id', 'name']
         }]
    });

    if (!product) {
      return res.status(404).redirect("/products");
    }

    const relatedProducts = await Product.findAll({
      where: {
        id: { [Op.ne]: product.id }
      },
      limit: 4
    });

    res.status(200).render("users/productsDetails", {
      title: product.name,
      product,
      relatedProducts
    });
  } catch (err) {
    console.log("PRODUCT DETAIL ERROR:", err);
    res.status(500).send("Sunucu Hatası");
  }
};


// ÜRÜN ARAMA
exports.searchProducts = async (req, res) => {
  try {
    const q = req.query.q || "";

    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${q}%`
        }
      }
    });

    res.status(200).render("users/search", {
      title: "Arama Sonuçları",
      products,
      searchQuery: q
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Sunucu Hatası");
  }
};