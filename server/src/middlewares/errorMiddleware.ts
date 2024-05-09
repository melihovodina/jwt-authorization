import express from 'express'; // Импорт модуля express для обработки HTTP-запросов
import ApiError from '../exceptions/apiErrors'; // Импорт класса ApiError, который определяет структуру ошибок API

// Экспорт функции по умолчанию, которая обрабатывает ошибки
export default function (err: Error | ApiError, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(err) // Вывод информации об ошибке в консоль
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors}); // Отправка ответа со статусом ошибки и информацией об ошибке
    } // Если ошибка является экземпляром ApiError
    return res.status(500).json({message: 'Smth gone wrong'});  // Если ошибка не является экземпляром ApiError, стандартное сообщение об ошибке
}
