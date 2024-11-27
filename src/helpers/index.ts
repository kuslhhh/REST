import crypto from "crypto"
import dotenv, { config } from "dotenv"

dotenv.config()

const SECRET = "ksh-api-rest"

export const random = () => crypto.randomBytes(64).toString('base64');
export const authentication = (salt: string, password: string) => {

    if (!SECRET) {
        throw new Error('SECRET is not defined');
    }
    return crypto.createHmac("sha256", [salt, password].join("/")).update(SECRET).digest("hex")

}