const Joi = require('joi');
require('dotenv').config();

const envSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    PORT: Joi.number().default(3000),
    REDIS_PORT: Joi.number().default(6379),
    JWT_SECRET: Joi.string()
        .required()
        .description('JWT Secret is required'),
    DB_HOST: Joi.string().required().description('Database host is required'),
    DB_PORT: Joi.number().default(5432),
    DB_USER: Joi.string().required().description('Database user is required'),
    DB_PASSWORD: Joi.string().required().description('Database password is required'),
    DB_NAME: Joi.string().required().description('Database name is required'),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    nodeEnv: envVars.NODE_ENV,
    port: envVars.PORT,
    redisPort: envVars.REDIS_PORT,
    jwtSecret: envVars.JWT_SECRET,
    db: {
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        user: envVars.DB_USER,
        password: envVars.DB_PASSWORD,
        name: envVars.DB_NAME,
    },
};
