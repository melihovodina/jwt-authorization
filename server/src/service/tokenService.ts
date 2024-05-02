// Импорт библиотек
import jwt from 'jsonwebtoken'; // Используется для создания токенов
import { Types } from "mongoose"; // Используется для определения типа ObjectId
import tokenModel from '../models/tokenModel'; // Модель данных для токена
import { config } from "dotenv"; // Используется для загрузки переменных окружения из файла .env
config({ path: "./other/.env" }); // Загрузка переменных окружения из файла .env

const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || "access token is not working";
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || "refresh token is not working";

class TokenService {
    // Функция для генерации токенов
    generateTokens(payload:any) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_KEY, {expiresIn: '30m'}); // Создание access токена, который истекает через 30 минут
        const refreshToken = jwt.sign(payload, JWT_REFRESH_KEY, {expiresIn: '30d'}); // Создание refresh токена, который истекает через 30 дней
        return {
            accessToken,
            refreshToken
        }
    }

    // Функция для сохранения refresh токена в базе данных
    async saveToken(userId: Types.ObjectId, refreshToken: string) {
        const tokenData = await tokenModel.findOne(userId) // Поиск токена в базе данных по userId
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        } // Если токен найден, обновление refresh токена и сохранение в базе данных
        const token = await tokenModel.create({user: userId, refreshToken}) // Сохранение рефреш токена в бд
        return token;
    }
}

export default new TokenService(); // Экспорт экземпляра класса TokenService