const getEnv = (key: string, defaultValue?: string): string => {
   const value = process.env[key] || defaultValue;
   console.log(`Loading environment variable ${key}: ${value}`); // ✅ Add this for debugging
   if (value === undefined) {
       throw new Error(`Missing environmental variable ${key}`);
   }
   return value;
};

export const MONGO_URI = getEnv("MONGO_URI");
export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "4004");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");

