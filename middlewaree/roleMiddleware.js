const jwt = require("jsonwebtoken");
const {secret} = require("../comfig");

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }

        try{
            const token = req.headers.authorization.split(' ')[1];//вытаскиваем токен (вернее - его тип) из заголовка
            if (!token) {//если токена нет, то возвращаем ошибку клиенту
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const {roles: userRoles} = jwt.verify(token, secret)

            //проверка разрешена ли роль пользователя для данной функции
            let hasRole = false //создание переменной ключа - будет принимать значения false/true
            userRoles.forEach(role => { //перебираем роли пользователя
                if(roles.includes(role)) { //ищем совпадения хотя бы с 1-й разрешенной ролью
                    hasRole = true; // если есть совпадение, переключаем значение переменной
                }
            })
            if (!hasRole) { //если роль не предполагает разрешения
                return res.status(403).json({massage:"У вас нет доступа к списку"})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
};