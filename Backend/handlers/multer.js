import multer from "multer"

export default multer({
    limits: {fileSize: 1000000, files:1},
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
            cb(new Error('file is not supported'),false)
            return
        }
        cb(null,true)
    }
})