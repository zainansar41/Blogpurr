import multer from "multer"

export default multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
            cb(new Error('file is not supported'),false)
            return
        }
        cb(null,true)
    }
})