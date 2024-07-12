import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: "",
    },
    img: {
        type: String,
        default: "",
    },
    googleSignIn:{
        type: Boolean,
        required: true,
        default: false,
    },
    animes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Animes",
        default: [],
    },
    favorits: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Animes",
        default: [],
    }
},
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);