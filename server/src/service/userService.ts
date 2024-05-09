import userModel from "../models/userModel"; // Модель данных пользователя
import bcrypt from "bcrypt"; // Библиотека для хеширования паролей
import { v4 as uuidv4 } from 'uuid'; // Библиотека для генерации уникальных идентификаторов
import tokenService from "./tokenService"; // Сервис для генерации токенов
import UserDto from '../dtos/userDto'; // Dto пользователя
import ApiError from "../exceptions/apiErrors";
//import mailService from "./mailService"; // Сервис для отправки электронной почты
import { config } from "dotenv"; // Библиотека для работы с переменными окружения
config({ path: "./other/.env" }); // Загрузка переменных окружения из файла .env

const SITE_URL = process.env.SITE_URL || "site url is not working";

class UserService {
    // Асинхронный метод для регистрации пользователя
    async registration(email: string, password: string) {
        const candidate = await userModel.findOne({ email }); // Поиск пользователя с указанным email в базе данных
        
        if(candidate) {
            throw ApiError.BadRequest(`${email} is already registered`);
        } // Если пользователь уже существует, выбрасывается ошибка
        
        const hashPassword = await bcrypt.hash(password, 10); // Хеширование пароля с использованием bcrypt
        const activationLink = uuidv4(); // Генерация уникальной ссылки активации с использованием uuid
        
        const user = await userModel.create({ email, password: hashPassword, activationLink }); // Создание нового пользователя
        //await mailService.sendActivationMail(email, `${SITE_URL}/api/acitivate/${activationLink}`); //Отправка письма с ссылкой активации на указанный email
        
        const userDto = new UserDto(user) // Создание DTO пользователя
        const tokens = tokenService.generateTokens({...userDto}); // Генерация токенов для пользователя
        //троеточие перед userDto нужно для передачи аргументов userDto, а не самого объекта
        await tokenService.saveToken(userDto.id, tokens.refreshToken) // Сохранение токена в бд
        
        return {...tokens,user: userDto}
    }
    
    // async activate (activationLink: string) {
    //     const user = await userModel.findOne({ activationLink: activationLink })
    //     if (!user) {
    //         throw ApiError.BadRequest('Bad activation link')
    //     }
    //     user.isActivated = true;
    //     await user.save()
    // }
}

export default new UserService(); // Экспорт экземпляра класса UserService