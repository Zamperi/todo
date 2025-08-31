//Harjoituksen vuoksi lisävalidointia
export function validateEnv() {
  const requiredKeys = ["PORT", "DB_USER", "DB_HOST", "DB_NAME", "DB_PASSWORD", "DB_PORT", "TEST_DB_NAME", "JWT_SECRET_KEY", "DUMMY_HASH"];
  const missing = requiredKeys.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
  if(process.env.PORT < 0 || process.env.PORT > 65535) throw new Error(`Port number invalid`);
  return;
}
