module.exports = (req, res, next) => {

  
  if (req.session.user) { // Kullanıcı giriş yaptıysa session'da vardır
    res.locals.user = req.session.user;
    res.locals.isAuth = true;


     if (req.session.user.isAdmin) {    
      // Admin mi değil mi kontrolü
      res.locals.isAdmin = true;
    } else {
      res.locals.isAdmin = false;
    }
  } else { // Giriş yapılmamışsa
    res.locals.user = null;
    res.locals.isAuth = false;
    res.locals.isAdmin = false;
  }

  next();
};
