const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
  
    // Ensure numWeeks and weeklyRevenue are defined and are numbers
    if (!numWeeks || !weeklyRevenue || isNaN(numWeeks) || isNaN(weeklyRevenue)) {
      return res.status(400).send('numWeeks and weeklyRevenue must be valid numbers');
    }
  
    // Calculate the total value of the idea
    const totalValue = numWeeks * weeklyRevenue;
  
    // Check if the total value is at least one million dollars
    if (totalValue >= 1000000) {
      next();
    } else if (totalValue < 1000000) {
      res.status(400).send('Idea must be worth at least one million dollars');
    }
  };
  
  module.exports = checkMillionDollarIdea;
  
