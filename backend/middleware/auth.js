import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';

admin.initializeApp();

export default async function (req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const decoded = await getAuth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}
