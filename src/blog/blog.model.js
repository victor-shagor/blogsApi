import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: String,
    content: String,
  },
  { timestamps: { createdAt: "created_at" } }
);

export const BlogModel = mongoose.model("blogs", BlogSchema);

const CommentsSchema = new Schema(
  {
    name: String,
    comment: String,
    blogId: { type: Schema.Types.ObjectId },
    parentId: { type: Schema.Types.ObjectId },
    dateCreated: Date,
    dateUpdated: Date,
  },
  { timestamps: { createdAt: "created_at" } }
);

export const CommentsModel = mongoose.model("comments", CommentsSchema);
