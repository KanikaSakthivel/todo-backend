import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import cors from 'cors';

admin.initializeApp();

// Enable CORS for the backend
const corsOptions = {
  origin: 'https://todo-frontend-virid-rho.vercel.app', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

export default async function (req, res, next) {
  // Use the CORS middleware to allow cross-origin requests
  cors(corsOptions)(req, res, () => {});

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
