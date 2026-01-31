// express
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// middlewares
const cookieParser = require("cookie-parser");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// node modules
const path = require("path");

// routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const checkoutRoutes = require("./routes/checkout");

// config
const config = require("./config");

// database
const sequelize = require("./data/db");
const DummyData = require("./data/dummyData");

// models
const Product = require("./models/product");
const User = require("./models/user");
const Category = require("./models/category");

// middlewares
const locals = require("./middlewares/local");

// layout
app.use(expressLayouts);

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cookie & session
app.use(cookieParser());
app.use(
  session({
    secret: "applesecretkey",
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db: sequelize }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

// locals
app.use(locals);

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// routes
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use("/account", authRoutes);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRoutes);

// relations
Product.belongsTo(Category, { foreignKey: "categoryId", as: "Category" });
Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });


// database sync
(async () => {
  try {
    await sequelize.sync({ force: true });
    await DummyData();
    console.log("Database sıfırlandı ve dummy data yüklendi");
  } catch (err) {
    console.log("DB error:", err);
  }
})();


    app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
