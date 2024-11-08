const checkAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin === 1) {
    next();
  } else {
    res.status(403).json({ message: "You are not allowed to add quotes" });
  }
};

export default checkAdmin;