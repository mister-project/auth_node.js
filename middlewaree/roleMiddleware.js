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
                }
            })
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
};