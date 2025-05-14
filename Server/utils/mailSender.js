const nodemailer=require("nodemailer");

require("dotenv").config();

const mailSender=async(email,title,body)=>{

    try{
        // let transporter=nodemailer.createTransport({
        //     host:process.env.MAIL_HOST,
        //     auth:{
        //         user:process.env.MAIL_USER,
        //         pass:process.env.MAIL_PASS
        //     }
        // })

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587, // or 465 for SSL
            secure: false, // true for port 465, false for others
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            logger: true, // enables logging
            debug: true,  // enables SMTP debug output
        });
        

       let info=await transporter.sendMail({
        from:`LearnSphere || by Rutak `,
        to:`${email}`,
        subject:`${title}`,
        html:`${body}`
       }) 

       console.log(info);
       return info;


    }catch(error){
        
        console.log("Mail sending error:", error);
        throw error; // Let the parent handle it

    }

}


module.exports=mailSender;
