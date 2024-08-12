import mongoose, {Schema} from "mongoose";

const incomeSchema = new Schema({
    amount: {
        type: Number,
        required: [true, "Income Amount is Required"],
    },
    description: {
        type: String,
        required: [true, "Income Description is Required"],
    },
    category: {
        type: String,
        required: [true, "Income Category is Required"],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true});

export const Income = mongoose.model("Income", incomeSchema);