const express=require("express");
const app=express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactRoutes = require("./routes/Contact");

const cookieParser = require("cookie-parser");



const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const dotenv=require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

const database=require("./config/database");
database.connect();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:3000", 
    "https://learn-sphere12-uzvjev1nx-rutaks-projects-f0b53384.vercel.app/"
  ];

  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies if needed
  }));

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

cloudinaryConnect();


app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/",contactRoutes);


app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is running"
    })
})

app.listen(PORT,()=>{
    console.log(`Port is running at ${PORT}`)
})



// "https://studynotion-frontend-olive-sigma.vercel.app"
