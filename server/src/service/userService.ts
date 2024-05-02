import userModel from "../models/userModel"; // Модель данных пользователя
import bcrypt from "bcrypt"; // Библиотека для хеширования паролей
import { v4 as uuidv4 } from 'uuid'; // Библиотека для генерации уникальных идентификаторов
import mailService from "./mailService"; // Сервис для отправки электронной почты
import tokenService from "./tokenService"; // Сервис для генерации токенов
import UserDto from '../dtos/userDto'; // Dto пользователя

class UserService {
    // Асинхронный метод для регистрации пользователя
    async registration(email: string, password: string) {
        const candidate = await userModel.findOne({ email }); // Поиск пользователя с указанным email в базе данных
        
        if(candidate) {
            throw new Error(`${email} is already registered`);
        } // Если пользователь уже существует, выбрасывается ошибка
        
        const hashPassword = await bcrypt.hash(password, 10); // Хеширование пароля с использованием bcrypt
        const activationLink = uuidv4(); // Генерация уникальной ссылки активации с использованием uuid
        
        const user = await userModel.create({ email, password: hashPassword, activationLink }); // Создание нового пользователя
        await mailService.sendActivationMail(email, activationLink); // Отправка письма с ссылкой активации на указанный email
        
        const userDto = new UserDto(user) // Создание DTO пользователя
        const tokens = tokenService.generateTokens({...userDto}); // Генерация токенов для пользователя
        //троеточие перед userDto нужно для передачи аргументов userDto, а не самого объекта
        await tokenService.saveToken(userDto.id, tokens.refreshToken) // Сохранение токена в бд
        
        return {...tokens,user: userDto}
    }
}

export default new UserService(); // Экспорт экземпляра класса UserService