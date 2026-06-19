const validateRange = (range) => {
  const validRanges = ["3m", "6m", "12m", "all"];
  return validRanges.includes(range);
};

module.exports = validateRange;