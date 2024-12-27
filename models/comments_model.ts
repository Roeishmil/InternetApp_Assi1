import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  post_id: String,
   title: {
    type: String,
    required: true,
  },
  content: String,
  sender: {
    type: String,
    required: true,
  },
});

const commentModel = mongoose.model("Comments", commentSchema);

export default commentModel;