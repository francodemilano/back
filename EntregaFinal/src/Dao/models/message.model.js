import mongoose from "mongoose";

const messageModel = mongoose.model(
    'messages',
    new mongoose.Schema({
        user: String,
        message: String
    })
);

export default messageModel;
/* import mongoose from "mongoose";

const collection = 'Messages'

const schema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
        index: true
    },
    message:{
        type: String,
        required: true
    }
});

const messagesModel = mongoose.model(collection, schema);
export default messagesModel; */