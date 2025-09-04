//Здесь будет работа с сущностями РОЛИ

// достаем поля из пакета МОНГУС
const {Schema, model} = require('mongoose');

//Определяем схему хранения пользователя в БД
const Role = new Schema({
//     Задаем поле как свойство объекта и задаем значение роли пользователя. По умолчанию - просто 'USER'
    value: {type: String, unique: true, default: "USER"},
})

// Отправляем на экспорт МОДЕЛЬ !! - импорт в контроллере authController.js

module.exports = model('Role', Role);