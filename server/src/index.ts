import express from "express"; // Фреймворк для создания веб-приложений
import cors from "cors"; // Библиотека для обеспечения CORS
import cookieParser from "cookie-parser"; // Библиотека для разбора куки
import mongoose from "mongoose"; // Библиотека для работы с MongoDB
import router from "./router/index"; // Импорт роутера
import { config } from "dotenv"; // Библиотека для работы с переменными окружения
config({ path: "./other/.env" }); // Загрузка переменных окружения из файла .env

const app = express(); // Создание экземпляра приложения Express
const PORT = process.env.PORT || 3000;
const DB = process.env.DB || "database link is not working";

// Использование middleware
app.use(express.json()); // Разбор JSON-запросов
app.use(cookieParser()); // Разбор куки
app.use(cors()); // Обеспечение CORS
app.use('/api', router); // Использование роутера для путей, начинающихся с '/api'

// Функция для запуска приложения
const startApp = async () => {
    try {
        await mongoose.connect(DB); // Подключение к базе данных
        app.listen(PORT, () => {console.log(`listening port ${PORT}`);}); // Запуск сервера на указанном порту
    } catch (error) {
        console.log(error); // Вывод ошибки, если что-то пошло не так
    }
}

startApp(); // Запуск приложения