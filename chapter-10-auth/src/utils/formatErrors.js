function formatMongooseErrors(err) {
  const errors = {};

  if (err?.name === "ValidationError") {
    for (const key of Object.keys(err.errors)) {
      errors[key] = err.errors[key].message;
    }
  }

  // Duplicate key error (unique index)
  if (err?.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    if (field) errors[field] = `${field} already exists.`;
  }

  return errors;
}

module.exports = { formatMongooseErrors };