import mongoose from 'mongoose';

// Определение интерфейса UserModel, который описывает структуру данных пользователя
interface UserModel {
    email: string; // Электронная почта пользователя
    _id: mongoose.Types.ObjectId; // Уникальный идентификатор пользователя, автоматически создаваемый MongoDB
    //isActivated: boolean; // Статус активации учетной записи пользователя
}

// Определение класса UserDto, который используется для передачи данных пользователя
export default class UserDto {
    email: string; // Электронная почта пользователя
    id: mongoose.Types.ObjectId; // Уникальный идентификатор пользователя
    //isActivated: boolean; // Статус активации учетной записи пользователя

    // Конструктор класса, который принимает модель пользователя и инициализирует поля DTO
    constructor(model: UserModel) {
        this.email = model.email; // Инициализация поля email
        this.id = model._id; // Инициализация поля id
        //this.isActivated = model.isActivated; // Инициализация поля isActivated
    }
}