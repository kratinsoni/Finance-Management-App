import mongoose, {Schema} from "mongoose";

const expenseSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is Required"],
        trim: true,
        index: true
    },
    amount: {
        type: Number,
        required: [true, "Amount is Required"],
        trim: true,
        index: true
    },
    category: {
        type: String,
        required: [true, "Category is Required"],
        trim: true,
        index: true
    },
    description: {
        type: String,
        trim: true,
        index: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true})

export const Expense = mongoose.model("Expense", expenseSchema);