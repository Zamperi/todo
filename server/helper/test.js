import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import { hash } from "bcrypt";

import 'dotenv/config';
import { pool } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initializeTestDb = () => {
  const sql = fs.readFileSync(path.resolve(__dirname, "../querys.sql"), "utf8");
  pool.query(sql, (err) => {
    if (err) {
      console.error("Error initializing test database", err);
    } else {
      console.log("Test database initialized succesfully");
    }
  });
};

const insertTestUser = (email, password) => {
  hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password");
      return;
    }
    pool.query(
      "INSERT INTO account (email, password) VALUES ($1, $2)",
      [email, hashedPassword],
      (qErr) => {
        if (qErr) console.error("Error inserting test user");
        else console.log("Test user inserted succesfully");
      }
    );
  });
};

const getToken = (email) => {
    const { JWT_SECRET_KEY } = process.env;

    return jwt.sign(
      { sub: 1, email },
      JWT_SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: "15m",
        issuer: "your-app",
        audience: "your-app-clients",
      }
    );
};

export { initializeTestDb, insertTestUser, getToken };
