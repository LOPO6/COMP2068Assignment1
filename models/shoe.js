import mongoose, {Mongoose} from "mongoose";

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
    }
});
const Shoe = mongoose.model('Shoe',shoeSchema)

export default Shoe;