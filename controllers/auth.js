const User = require("../models/user");
const bcrypt = require("bcrypt");

const setMessage = (req, text, type) => {
  req.session.message = { text, class: type };
};

// GİRİŞ & KAYIT SAYFASI
exports.get_auth = (req, res) => {
  const message = req.session.message;
  delete req.session.message;

  res.status(200).render("auth/auth", {
    title: "Giriş Sayfası",
    message
  });
};

// REGISTER
exports.post_register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ 
      where: { email }
     });
    if (existingUser) {
      setMessage(req, "Bu email adresiyle daha önce kayıt olunmuş.", "warning");
      return res.status(400).redirect("/account/auth");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname: name,
      email,
      password: hashedPassword,
      isAdmin: false
    });

    setMessage(req, "Kayıt başarılı! Giriş yapabilirsiniz.", "success");
    res.status(302).redirect("/account/auth");

  } catch (err) {
    console.log(err);
    res.status(500).redirect("/account/auth");
  }
};

// LOGIN
exports.post_login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
       where: { email } 
      });
      
    if (!user) {
      setMessage(req, "Email hatalı.", "danger");
      return res.status(401).redirect("/account/auth");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      setMessage(req, "Parola hatalı.", "danger");
      return res.status(401).redirect("/account/auth");
    }

    req.session.user = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin
    };

    res.status(302).redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).redirect("/account/auth");
  }
};

// LOGOUT
exports.get_logout = (req, res) => {
  req.session.destroy(() => {
    res.status(302).redirect("/");
  });
};