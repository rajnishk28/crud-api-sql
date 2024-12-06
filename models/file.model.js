const mongoose = require("mongoose");


const FileSchema = new mongoose.Schema(
    {
        description: {
            type: String,
        },
        file: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);
const Filemodel = mongoose.model("File", FileSchema);

module.exports = Filemodel;
