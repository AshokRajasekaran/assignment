const errorHandler = (res, err) => {
  // Handle other custom error for the applicaton
  console.log(err);
  res.statusCode = 500;
  res.json({ success: false, error: err });
};

module.exports = errorHandler;
