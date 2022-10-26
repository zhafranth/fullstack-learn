import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId)
    return res.status(400).json({ message: "Silahkan login" });

  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  req.role = user.role;
  req.userId = user.id;
  next();
};

export const guestUser = async (req, res, next) => {
  if (!req.session.userId) {
    req.role = "guest";
    return next();
  }
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  req.role = user.role;
  req.userId = user.id;
  next();
};
