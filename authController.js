//описание функций по взаимодействию с пользователем

//Импорт модулей пользователя и роли
const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcrypt') // переменная из библиотеки хэширования
const jwt = require('jsonwebtoken') // переменная из библиотеки хэширования
const {validationResult} = require('express-validator'); //функция возвращения ошибок, которые были получены при валидации
const {secret} = require('./comfig');

const generateAccessToken = (id, roles) => {
 const payload = {
     id,
     roles
 }
 return jwt.sign(payload, secret, {expiresIn: "24h"})

}

class authController {

    //Функция регистрации нового пользователя
        async registration(req, res) {
        try{
            const errors = validationResult(req); //вывод ошибок валидации
            if(!errors.isEmpty()) { //проверка наличия ошибок
                return res.status(400).json({message: "Ошибка при регистрации", errors});
            }
            const {username, password} = req.body// вытаскиваем нужные поля из тела запроса и делаем реструктуризацию
            const candidate = await User.findOne({username}) //переменная для временного статуса и проверки есть ли уже такой пользователь в БД

            //Ниже - сама проверка кандидата
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }

            //Создание нового пользователя
            const hashPassword = bcrypt.hashSync(password, 7); //хэширование пароля
            const userRole = await Role.findOne({value: "USER"})

            const user = new User({username, password: hashPassword, roles: userRole.value}) //создание пользователя

            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"}) // возврат ответа клиентской части

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})//оповещение клиента, присылающего запросы об ошибке
        }

    }

    //Функция авторизации имеющегося пользователя
    async login(req, res) {
        try{
            const {username, password} = req.body //вытаскиваем из тела запроса логин и пароль
            const user = await User.findOne({username}) //Ищем полученного пользователя по логину в БД
            if (!user) { //проверка наличия пользователя и сообщение, если он не найден
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password) //Получаем пароль и сра
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }

            const token = generateAccessToken(user._id, user.roles) //запуск функции  токена
            return res.json({token})


        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})//оповещение клиента, присылающего запросы об ошибке
        }

    }
    async getUsers(req, res) {//запрос данных по пользователям
        try{
            const users = await User.find()

            res.json(users)
        } catch (e) {
            console.log(e)
        }

    }
}
module.exports = new authController();