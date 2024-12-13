import Joi from 'joi';
import 'dotenv/config';

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3000).description('Port number of Backend server'),
        LOG_DIR: Joi.string().default('./logs').description('Directory for log files'),
        DB_URL: Joi.string().required().description('MongoDB URL'),
        DB_MIN_POOL_SIZE: Joi.number().default(2).description('MongoDB minimum pool size'),
        DB_MAX_POOL_SIZE: Joi.number().default(5).description('MongoDB maximum pool size'),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_HOURS: Joi.number().default(1).description('hours after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('minutes after which reset password token expires'),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('minutes after which verify email token expires'),
        SMTP_HOST: Joi.string().description('server that will send the emails'),
        SMTP_PORT: Joi.number().description('port to connect to the email server'),
        SMTP_USERNAME: Joi.string().description('username for email server'),
        SMTP_PASSWORD: Joi.string().description('password for email server'),
        SMTP_FROM_EMAIL: Joi.string().description('the from field in the emails sent by the app'),
        FRONTEND_URL: Joi.string().required().description('URL of the frontend app'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    logDir: envVars.LOG_DIR,
    db: {
        url: envVars.DB_URL,
        options: {
            autoIndex: true,
            minPoolSize: envVars.DB_MIN_POOL_SIZE,
            maxPoolSize: envVars.DB_MAX_POOL_SIZE,
        },
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_HOURS,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
        cookieOptions: {
            httpOnly: true,
            secure: envVars.NODE_ENV === 'production',
            signed: true,
        },
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD,
            },
        },
        from: envVars.SMTP_FROM_EMAIL,
    },
    clientUrl: envVars.FRONTEND_URL,
};

export default config;