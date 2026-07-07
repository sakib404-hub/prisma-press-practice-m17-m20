import Stripe from "stripe"
import config from "../config/config"

const stripe = new Stripe(config.stripe_secret_api_key);

export default stripe;