import mongoose, {Mongoose} from "mongoose";

const storeSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    address:{
        type: String,
        required: true
    },
    stock:{
        type:Number,
        required: true
    }
})

const shoeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category:{
        type: String
    },
    manufacturer:{
        type: String
    },
    stores: [storeSchema]
});



const Shoe = mongoose.model('Shoe',shoeSchema)

export default Shoe;