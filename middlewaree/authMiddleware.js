//функция для предоставления доступа только зарегистрированным пользователям
const jwt = require("jsonwebtoken"); //начало расшифровки полученного токена
const {secret} = require("../comfig");
module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1];//вытаскиваем токен (вернее - его тип) из заголовка
        if (!token) {//если токена нет, то возвращаем ошибку на клиентскую часть
            return res.status(403).json({message: "Пользователь не авторизован"})
        }

        //Если токен есть, то нам необходимо его декодировать
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
};