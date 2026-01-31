const Category = require("../models/category");
const Product = require("../models/product");
const User = require("../models/user");
const bcrypt = require("bcrypt");


const categoriesData = [
  { name: "Phones", image: "/static/images/icons/phones.png" },
  { name: "Smart Watches", image: "/static/images/icons/Smart Watches.png" },
  { name: "Cameras", image: "/static/images/icons/Cameras.png" },
  { name: "Headphones", image: "/static/images/icons/Headphones.png" },
  { name: "Computers", image: "/static/images/icons/Computers.png" },
  { name: "Gaming", image: "/static/images/icons/Gaming.png" },
];

async function populate() {

  if (await Category.count() === 0) {
    await Category.bulkCreate(categoriesData);
    console.log("Kategoriler eklendi");
  }

  if (await User.count() === 0) {
    await User.bulkCreate([
      {
        fullname: "Fatma",
        email: "fatma@gmail.com",
        password: await bcrypt.hash("fatma", 10),
        isAdmin: true,
      },
      {
        fullname: "Ahmet Yılmaz",
        email: "ahmet@gmail.com",
        password: await bcrypt.hash("ahmet", 10),
        isAdmin: true,
      },
      {
        fullname: "Mehmet Yener",
        email: "mehmet@gmail.com",
        password: await bcrypt.hash("mehmet", 10),
        isAdmin: false,
      },
    ]);
    console.log("Kullanıcılar eklendi");
  }

  // ÜRÜNLER
  if (await Product.count() === 0) {
    const createdCategories = await Category.findAll();
    const catMap = {};
    createdCategories.forEach(c => (catMap[c.name] = c.id));


    await Product.bulkCreate([
    
      {
        name: " Apple iPhone 14 Pro Max 128GB Deep Purple (MQ9T3RX/A)",
        price: 900,
        brand: "Apple",
        image: "/static/images/Iphon.png",
        categoryId: catMap["Phones"],
      },
      {
        name: "Blackmagic Pocket Cinema Camera 6k",
        price: 2535,
        brand: "Blackmagic",
        image: "/static/images/Camera.png",
        categoryId: catMap["Cameras"],
      },
      {
        name: "Apple Watch Series 9 GPS 41mm Starlight Aluminium Case",
        price: 399,
        brand: "Apple",
        image: "/static/images/AppleWatch.png",
        categoryId: catMap["Smart Watches"],
      },
      {
        name: "AirPods Max Silver",
        price: 249,
        brand: "Apple",
        image: "/static/images/kulaklik.png",
        categoryId: catMap["Headphones"],
      },
      {
        name: "Samsung Galaxy Watch6 Classic 47mm Black",
        price: 369,
        brand: "Samsung",
        image: "/static/images/Iphone 14 pro 1 (36)-1766926278430.png",
        categoryId: catMap["Smart Watches"],
      },
      {
        name: "Galaxy Z Fold5 Unlocked | 256GB | Phantom Black",
        price: 1799,
        brand: "Samsung",
        image: "/static/images/10787914a0ffcff215f824ce6b4ece364fd8757e (1).png",
        categoryId: catMap["Phones"],
      },
      {
        name: "Galaxy Buds FE Graphite",
        price: 99.99,
        brand: "Canon",
        image: "/static/images/efc971fbc0c0ba87919da1b52c3f38a360bd53f5 (1).png",
        categoryId: catMap["Headphones"],
      },
      {
        name: "Apple iPad 9 10.2 64GB Wi-Fi Silver (MK2L3) 2021",
        price: 499,
        brand: "Sony",
        image: "/static/images/7609e5cdf4f1449533f9f5a48db3baede928c3bc (1).png",
        categoryId: catMap["Phones"],
      },
    {
            name: "Apple iPhone 14 Pro 512GB Gold (MQ233)",
            price: 1437,
            brand: "Apple",
            image: "/static/images/75e9511b54189b8ee3104a701ea71c524e6521e4 (1)-1768748392159.png",
            categoryId: catMap["Phones"],
          },
          {
            name: "AirPods Max Silver",
            price: 549,
            brand: "Apple",
            image: "/static/images/kulaklik-1768748442143.png",
            categoryId: catMap["Headphones"],
          },
          {
            name: "Apple Watch Series 9 GPS 41mm Starlight Aluminium Case",
            price: 399,
            brand: "Apple",
            image: "/static/images/Iphone 14 pro 1 (35)-1768748521873.png",
            categoryId: catMap["Smart Watches"],
          },
          {
            name: "Apple iPhone 14 Pro 1TB Gold (MQ2V3)",
            price: 1499,
            brand: "Apple",
            image: "/static/images/91a91f9fa51ffe2dcd3c8c730f33e506dd49f245 (2)-1768748549742.png",
            categoryId: catMap["Phones"],
          },
          {
            name: "Apple iPhone 14 Pro 512GB Gold (MQ233)",
            price: 1437,
            brand: "Apple",
            image: "/static/images/75e9511b54189b8ee3104a701ea71c524e6521e4 (1).png",
            categoryId: catMap["Phones"],
          },
          {
            name: "Apple iPhone 13 128GB White (MQ8L3)",
            price: 510,
            brand: "Apple",
            image: "/static/images/34cebf757f8dea2a7d3639bb78713105f1431309 (1)-1768763097957.png",
            categoryId: catMap["Phones"],
          },
          {
            name: "Apple iPhone 13 128GB White (MQ8L3)",
            price: 550,
            brand: "Apple",
            image: "/static/images/34cebf757f8dea2a7d3639bb78713105f1431309 (1)-1768763097957.png",
            categoryId: catMap["Phones"],
          },
        
          {
            name: "Apple iPhone 14 Pro 1TB Gold (MQ2V3)",
            price: 1499,
            brand: "Apple",
            image: "/static/images/91a91f9fa51ffe2dcd3c8c730f33e506dd49f245 (2)-1768763379116.png",
            categoryId: catMap["Phones"],
          },
          {
            name: "Apple iPhone 14 Pro 1TB Gold (MQ2V3)",
            price: 1399,
            brand: "Apple",
            image: "/static/images/75e9511b54189b8ee3104a701ea71c524e6521e4 (1)-1768763043376.png",
            categoryId: catMap["Phones"],
          },
          {
            name: "Apple iPhone 14 Pro 256GB Deep Purple (MQ0G3)",
            price: 1600,
            brand: "Apple",
            image: "/static/images/0123832569250cc2de152232d881e44b747d3e55 (1)-1768763217221.png",
            categoryId: catMap["Phones"],
          },
        
          {
            name: "Apple iPhone 13 mini 128GB Pink (MK7K3)",
            price: 850,
            brand: "Apple",
            image: "/static/images/6cfe0b09d9117ef7d870d16c2ee487ae54daf98a (1)-1768763264651.png",
            categoryId: catMap["Phones"],
          },
          {
            name: "Apple iPhone 14 Pro 256GB Space Black (MQ0Q3)",
            price: 1399,
            brand: "Apple",
            image: "/static/images/2b12e06b5f2b9bbd5cdc31ba14fe87f3c707b098-1769361766308.png",
            categoryId: catMap["Phones"],
          },
          {
            name: "Apple iPhone 14 Pro 256GB Silver (MQ0M3)",
            price: 1399,
            brand: "Apple",
            image: "/static/images/91a91f9fa51ffe2dcd3c8c730f33e506dd49f245 (2)-1768748549742.png",
            categoryId: catMap["Phones"],
          },
        ]);

    console.log("Ürünler eklendi");
  }
}

module.exports = populate;