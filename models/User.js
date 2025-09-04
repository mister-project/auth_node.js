//Здесь будет работа с сущностями пользователя


// достаем поля из пакета МОНГУС
const {Schema, model} = require('mongoose');

//Определяем схему хранения пользователя в БД
const User = new Schema({
//     Задаем поля как свойство объекта и задаем параметры
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: {type: String, ref: 'Role'}, //Дана ссылка на сущность роли, которая будет определена отдельно ***
})

// Отправляем на экспорт МОДЕЛЬ !! (первым аргументом указываем название модели, вторым - схема, по которой новая модель создается). Импорт - в authController.js

module.exports = model('User', User);