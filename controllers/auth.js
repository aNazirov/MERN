const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req,res){
    const candidate = await User.findOne({email: req.body.email})

    if(candidate){
        //password
        const passwordResult = bcryptjs.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            //jwt.sign(Передаваемые объекты, Секретный ключ для шифровки, Время жизни токена(ключа))
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 3600})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else{
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            })
        }
    }else{
        //candidate false
        res.status(404).json({
            message: 'Пользователь с таким e-mail не найден.'
        })
    }
}

module.exports.register = async function(req,res){ //Выделяем что эта функция ассинхронна
    //email password
    const candidate = await User.findOne({email: req.body.email}) //Функция будет ждать ответа от этого метода перед продолжением //async

    if(candidate){
        // Пользователь с таким майлом существует error
        res.status(409).json({
            message: `Пользователь с таким email уже существует.`
        })
    } else {
        const salt = bcryptjs.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcryptjs.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (error) {
            //Универсальная обработка ошибки
            errorHandler(res, error)
        }
        /*  
            const user = new User({
            email: req.body.email,
            password: req.body.password
            })
            user.save().then(() => console.log('User created'))
        */
    }
}