import "dotenv/config";
import Joi from "joi";

const envVarsSchema = Joi.object()
    .keys({
        DB_MAX_POOL_SIZE: Joi.number().default(5).description("MongoDB maximum pool size"),
        DB_MIN_POOL_SIZE: Joi.number().default(2).description("MongoDB minimum pool size"),
        DB_URL: Joi.string().required().description("MongoDB URL"),
        FRONTEND_URL: Joi.string().required().description("URL of the frontend app"),
        JWT_ACCESS_EXPIRATION_HOURS: Joi.number().default(1).description("hours after which access tokens expire"),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description("days after which refresh tokens expire"),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description("minutes after which reset password token expires"),
        JWT_SECRET: Joi.string().required().description("JWT secret key"),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description("minutes after which verify email token expires"),
        LOG_DIR: Joi.string().default("./logs").description("Directory for log files"),
        NODE_ENV: Joi.string().valid("production", "development", "test").required(),
        PORT: Joi.number().default(3000).description("Port number of Backend server"),
        SMTP_FROM_EMAIL: Joi.string().description("the from field in the emails sent by the app"),
        SMTP_HOST: Joi.string().description("server that will send the emails"),
        SMTP_PASSWORD: Joi.string().description("password for email server"),
        SMTP_PORT: Joi.number().description("port to connect to the email server"),
        SMTP_USERNAME: Joi.string().description("username for email server"),
    })
    .unknown();

const {value: envVars, error} = envVarsSchema.prefs({errors: {label: "key"}}).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    clientUrl: envVars.FRONTEND_URL,
    db: {
        options: {
            autoIndex: true,
            maxPoolSize: envVars.DB_MAX_POOL_SIZE,
            minPoolSize: envVars.DB_MIN_POOL_SIZE,
        },
        url: envVars.DB_URL,
    },
    email: {
        from: envVars.SMTP_FROM_EMAIL,
        smtp: {
            auth: {
                pass: envVars.SMTP_PASSWORD,
                user: envVars.SMTP_USERNAME,
            },
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
        },
    },
    env: envVars.NODE_ENV,
    jwt: {
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_HOURS * 60,
        cookieOptions: {
            httpOnly: true,
            secure: envVars.NODE_ENV === "production",
            signed: true,
        },
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        secret: envVars.JWT_SECRET,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    logDir: envVars.LOG_DIR,
    port: envVars.PORT,
};

export default config;
