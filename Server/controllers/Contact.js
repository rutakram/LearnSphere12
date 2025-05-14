const Contact = require("../models/Contact");


exports.contact = async(req,res)=>{

   
    try{

        const {
            firstName,
            lastName,
            email,
            countryCode,
            phoneNumber,
            message
             } = req.body;

         

            if(!firstName || !lastName || !email || !countryCode
               || !phoneNumber || !message
            ){
                return res.status(400).json({
                    success: false,
                    message: "All Fields are Mandatory",
                }); 
            }

        const response = await Contact.create({
            firstName,lastName,email,countryCode,phoneNumber,message
        });

        res.status(200).json({
			success: true,
			data: response,
			message: "Message Send Successfully",
		});


    }catch(error){
        console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to add message",
			error: error.message,
		});
    }

}

