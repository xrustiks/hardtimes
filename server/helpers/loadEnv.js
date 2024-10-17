import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the secret key from the environment variables
const loadEnv = () => {
  // Convert the module URL to a file path
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // Load environment variables from a specific path
  dotenv.config({ path: path.resolve(__dirname, '../.env') });

  return process.env;
};

export default loadEnv;