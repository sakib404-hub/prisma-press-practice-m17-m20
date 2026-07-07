import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), '.env')
})

const config = {
    portNumber: process.env.PORT,
    databse_url: process.env.DB_URL,
    bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS),
    app_url: process.env.APP_URL,
    jwt_secret: process.env.JWT_SECRET!,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,
    jwt_access_token_expiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION!,
    jwt_refresh_token_expiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION!,
    stripe_product_id : process.env.STRIPE_PRODUCT_ID!,
    stripe_secret_api_key : process.env.STRIPE_SECRET_API_KEY!
}

export default config;