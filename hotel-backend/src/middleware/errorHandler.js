const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = 500;
  let message = "Something went wrong.";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed.";
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid data format.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: err.message,
  });
};

export default errorHandler;
