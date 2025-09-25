import dotenv from "dotenv";

dotenv.config();

export const env= {
    port: Number(process.env.PORT),
    jwt: String(process.env.JWT_SECRET),
    jwtRefresh: String(process.env.JWT_SECRET_REFRESH)
}