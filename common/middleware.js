import jwt from 'jsonwebtoken';

export const withAuth = (handler) => async (req, res) => {
  const { token } = req.cookies;
  try {
    const decoded = await jwt.verify(token, "ZULFAN");
    req.user = decoded;
    return handler(req, res);
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};