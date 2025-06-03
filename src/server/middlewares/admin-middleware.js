module.exports = (req, res, next) => {
  if (req.user?.email === "root") {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Admins only" });
};
