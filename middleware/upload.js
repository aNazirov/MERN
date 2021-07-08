const moment = require('moment') //чисто для формирования даты загрузки
const multer = require('multer') //для работы с самим загружаемым файлом

const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, 'uploads/')
    },
    filename(req, file, callback){
        const date = moment().format('DDMMYYYY-HHmmss_SSS') 
        callback(null, `${date}-${file.originalname}`)
    }

})

const fileFilter = (req, file, callback)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        callback(null, true)
    } else {
        callback(null, false)
    }
}
const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({
    storage,
    fileFilter,
    limits
})

