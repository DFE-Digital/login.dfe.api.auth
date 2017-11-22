const jwt = require('jsonwebtoken');

module.exports = secret => (req, res, next) => {
  const getFailureMessage = () => ({
    success: false,
    message: 'No token provided.',
  });

    // check header or url parameters or post parameters for token
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ').length !== 2) {
    return res.status(403).send(getFailureMessage());
  }
  const token = req.headers.authorization.split(' ')[1];

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      req.decoded = decoded;
      return next();
    });
  }
  return res.status(403).send(getFailureMessage());
};
