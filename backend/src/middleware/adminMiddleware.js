const verifyAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];

  console.log('Received key:', adminKey);
  console.log('Expected key:', process.env.ADMIN_SECRET);

  if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }

  next();
};

module.exports = verifyAdmin;


