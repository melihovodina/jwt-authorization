import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config({ path: "./other/.env" });

const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || "access token is not working";
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || "refresh token is not working";

class TokenService {
    generateTokens(payload:any) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_KEY);
    }
}

export default new TokenService();