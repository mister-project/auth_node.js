//файл для маршрутизации запросов
const Router = require('express') //импорт роутера из express
const router = new Router()// создание объекта из роутера
const controller = require('./authController')
const {check} = require('express-validator') //вызов функции для валидации
const authMiddleware = require('./middlewaree/authMiddleware') //предвар. проверка авторизации
const roleMiddleware = require('./middlewaree/roleMiddleware') //проверка прав доступа по роли пользователя


// Организация запросов
router.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', "Пароль не должен быть больше 4 и меньше 10 символов").isLength({min: 4, max: 10}),
], controller.registration)

router.post('/login', controller.login) //проверка логина
router.get('/users', roleMiddleware(['USER']), controller.getUsers) //установка различных доступов

module.exports = router //выдача метода наружу (экспорт)