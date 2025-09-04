//  модуль Express импортируем в проект
console.log('index.js запущен')
const express = require(`express`);

// Вызываем утилиту библиотеку для коннекта с БД Mongo
const mongoose = require(`mongoose`);

//Запуск роутера для обработки функций с пользователями
const authRouter = require('./authRouter');


const cors = require('cors') //пакет для загрузки ролей в массив
// console.log(authRouter);

// Константа для сохранения значения порта (если из системных переменных получить не получается, присваиваем значение '5000')
const PORT = process.env.PORT || 5000


// создаем приложение (сервер)
const app = express()


// Парсинг JSON
app.use(express.json())

//Прослушивание роутера
app.use("/auth", authRouter)

//подключение пакета для подгрузки ролей в массив
app.use(cors());

//Функция, запускающая сервер. При добавлении связи с БД функция будет асинхронной
const start = async () => {
    try {

        //  коннект с БД
        await mongoose.connect(`mongodb+srv://webprograms:qwerty123@cluster0.rlj7ttq.mongodb.net/auth_roles1?retryWrites=true&w=majority&appName=Cluster0`)
    //     Запускаем прослушивание порта
        app.listen(PORT, () => console.log(`старт сервера на порту ${PORT}`));

    } catch (e) {
        console.log(e)

    }
}
start();