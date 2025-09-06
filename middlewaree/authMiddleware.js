//функция для предоставления доступа только зарегистрированным пользователям
module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1];//вытаскиваем токен (вернее - его тип) из заголовка
        if (!token) {//если токена нет, то возвращаем ошибку клиенту
            return res.status(403).json({message: "Пользователь не авторизован"})
        }

    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }

};