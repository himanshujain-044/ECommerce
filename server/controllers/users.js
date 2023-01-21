module.exports.login = async (req, res, next) => {
  try {
    console.log("3 user");
  } catch (err) {
    next(err);
  }
};
