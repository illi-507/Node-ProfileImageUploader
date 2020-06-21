const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

//multer setup
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/myupload');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
  })
   
var upload = multer({ 
      storage: storage,
       
}).single("profilepic"); 
//from :<input type="file" name="profilepic" class="custom-file-input" required>


//Description of 
app.post('/upload',(req,res)=>{
    upload(req,res,(error)=>{
      if(error){
          res.render("index",{
            message:error
          });          
        }
        else{
          res.render('index',{
            message: "Uploaded successfully",
            filename: `myupload/${req.file.filename}`
          })
        }
    });
});


app.listen(port,()=>console.log("Your fucking server is running at port 3000..."));


app.get('/',(req,res)=>{
    res.render('index');

})


//setup ejs
app.set("view engine","ejs");
// static folder
app.use(express.static("./public"));



