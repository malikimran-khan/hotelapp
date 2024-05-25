const express = require('express')
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const multer = require('multer')
const cors = require('cors');
const { error } = require('console');
app.use(cors())
app.use(express.static(path.join(__dirname , "public")))
mongoose.connect("mongodb://localhost:27017/insertionperform", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("Error during monfoDB connection", error);
  });
const upload = multer({
    storage : multer.diskStorage({
        destination : function(req , file , cb){
            console.log("api hit")
            cb(null , './public/images')
        },
        filename : function(req , file , cb)
        {
            console.log(file.originalname)
            cb(null, Date.now() + "-" + file.originalname);
        }
    })
})
const roomSchema = new mongoose.Schema({
    number: String,
    roomclass: String,
    price: String,
    images: String,
    details: String,
  });
  const Room = mongoose.model("insertionrooms9", roomSchema);
  app.use(express.json())
  app.post("/multer" , upload.single("file-upload") , (req,res)=>{
    try{
        if(!req.file)
        {
            throw new Error("no file uploaded")
        }
        res.json({status:1 , name : req.file.filename})

    }catch(err)
    {
        res.send({status:-1 , masssage : err.masssage})
    }
  })
  app.post("/insertdata", async (req, res) => {
    try {
      console.log(req.body);
      const { number, roomclass, price, details, images } = req.body;
      const room = new Room({
        number,
        price,
        roomclass,
        details,
        images: images, 
      });
      await room.save();
      res.status(200).json({ success: true, massage: "save data successfully" });
    } catch (error) {
      console.log("error in inserted data", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });
  app.get("/fetchdata" , async(req , res)=>{
    try{
          const rooms = await Room.find();
          res.status(200).json(rooms)
    }catch(error)
    {
        console.log("error in fetching data", error);
    res.status(500).json({ success: false, error: "Internal server error" });
    }
  })
  app.get("/fetchdata/:id" , async(req,res)=>{
    const roomId = req.params.id
    try{
            const room= await Room.findById(roomId)
            if(!room)
            {
              return res.status(404).json({success:false , error : "Room not found"});
            }
            res.status(200).json(room)
    }catch(error)
    {
      console.log("error in fetch update" , error)
      res.status(500).json({success:false , error : "Interval server error"})
    }
  })
  app.delete("/delete/:id", async (req, res) =>{
    const roomId = req.params.id
    try{
          const deleteRoom = await Room.findByIdAndDelete(roomId)
          if (!deleteRoom) {
            return res.status(404).json({ success: false, error: "Record not found" });
          }
          res.status(200).json({ success: true, message: "Record deleted successfully" });
    }catch(error)
    {
        console.log("Error deleteing record" , error)
        res.status(500).json({ success: false, error: "Internal server error" });
    }
  })
  app.put("/update/:id" , upload.single("image") , async(req,res)=>{
          const roomId = req.params.id
          try{
            const { number, roomclass, price, details } = req.body;
            const imagePath = req.file ? req.file.filename : null;
              const updatedRoom = await Room.findByIdAndUpdate(roomId, {
                number,
                roomclass,
                price,
                details,
                images: imagePath,
            },{new:true})
            if(!updatedRoom)
            {
             return res.status(404).json({success:false , error: "Room Not Found"})
            }
            res.status(200).json({success:true , massage: "Updated data successfully"})
          }catch(error)
          {
            console.log("Error in Updating" , error)
            res.status(500).json({success:false , error : "Internal server error"})
          }
  })
  const signupSchema = new mongoose.Schema({
    name : String ,
    email : String ,
    password : String ,
    confirmpassword : String
  });
  const signupmodel = mongoose.model("/signupform" , signupSchema)
  app.post("/register" , (req , res)=>{
    signupmodel.create(req.body)
    .then((students)=>res.json(students))
    .catch((error)=>{
      console.log("Error in signup in backened" , error)
      res.status(500).json("internal server error in signup")
    })
  });
  app.post("/login", (req, res) => {
    const { email, password } = req.body;
    signupmodel.findOne({ email: email })
      .then((user) => {
        if (user) {
          if (user.password === password) {
            res.status(200).json({ success: true, message: "login successful" });
          } else {
            console.log("Password is incorrect");
            res.status(401).json({ success: false, error: "Incorrect password" });
          }
        } else {
          console.log("No record exists");
          res.status(404).json({ success: false, error: "User not found" });
        }
      })
      .catch((error) => {
        console.log("Error in login ... backend", error);
        res.status(500).json({ success: false, message: "Internal server error" });
      });
  });
  
app.listen(8000 , (req , res)=>{
    console.log("port is listened at 8000")
})