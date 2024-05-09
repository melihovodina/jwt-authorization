// Экспорт класса ApiError, который расширяет встроенный класс Error
export default class ApiError extends Error { 
    status: number; // Свойство для хранения статуса ошибки
    errors: any[]; // Свойство для хранения связанных с ошибкой данных

    constructor(status: number, message: string, errors: any[] = []) {
        super(message) // Вызов конструктора родительского класса Error
        this.status = status // Инициализация свойств status
        this.errors = errors // и errors
    } // Конструктор класса, принимающий статус, сообщение и данные об ошибках

    static UnathorizedError() {
        return new ApiError(401, 'Пользователь не авторизован') // Возвращает новый экземпляр ApiError с предопределенным статусом и сообщением
    } // Статический метод для создания ошибки "Пользователь не авторизован"

    static BadRequest(message: string, errors: any[] = []) {
        return new ApiError(400, message, errors) // Возвращает новый экземпляр ApiError
    } // Статический метод для создания ошибки "Неверный запрос"
}
