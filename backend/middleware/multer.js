import multer from 'multer';

const storage=multer.diskStorage({
  __filename:function(req,file,cb){
    cb(null,file.originalname)

  }
})
const upload=multer({storage})
export default upload