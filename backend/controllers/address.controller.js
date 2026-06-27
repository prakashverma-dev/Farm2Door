import Address from "../models/addresssModel.js";


// add address : /api/address/add
export const addAddress = async (req, res)=>{
    try {

        const userId = req.userId;
        const {address} = req.body;

        await  Address.create({
            ...address,
            userId,
        });

        res.status(201).json({message : "Address added successfully", success : true});

        
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ message: "Internal server error" });

        
    }
}

// get any user address : /api/address/get
export const getAddress = async (req, res)=>{
    try {
        const userId = req.userId; //as there will be multiple users address stored.
        const address = await Address.find({userId}).sort({ createdAt : -1});

    } catch (error) {
        
        console.error("Error fetching address:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}