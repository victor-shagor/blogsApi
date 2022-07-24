import mongoose from "mongoose";
import { BlogModel, CommentsModel } from "./blog.model";

/**
 * Class representing the blog service
 * @class BlogService
 * @description blog business logic
 */
export class BlogService {
  static async createBlog(blogDetails) {
    const { title, content, date } = blogDetails;
    const newBlog = await BlogModel.create({
      title,
      content,
      createdAt: date,
    });

    return newBlog;
  }

  static async getBlog(blogId) {
    let isValidId = mongoose.Types.ObjectId.isValid(blogId);
    if (!isValidId) {
      return {
        error: true,
      };
    }
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return {
        error: true,
      };
    }
    const blogs = await BlogModel.aggregate([
      { $match: { $expr: { $eq: ["$_id", { $toObjectId: blogId }] } } },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "blogId",
          as: "comments",
        },
      },
    ]);
    return blogs;
  }

  static async getBlogs(page = 1, query) {
    const limit = 6;
    const skip = page <= 1 ? 0 : (page - 1) * limit;
    const match = query
      ? { $match: { title: { $regex: query, $options: "i" } } }
      : { $match: {} };
    const [count, blogs] = await Promise.all([
      query
        ? BlogModel.count({ title: { $regex: query, $options: "i" } })
        : BlogModel.countDocuments({}),
      BlogModel.aggregate([
        match,
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "blogId",
            as: "comments",
          },
        },
        { $skip: skip },
        { $limit: limit },
        { $sort: { created_at: -1 } },
      ]),
    ]);

    return { count, blogs };
  }

  static async postComment(blogId, commentDetails) {
    const { name, comment, parentId } = commentDetails;
    let isValidId = mongoose.Types.ObjectId.isValid(blogId);
    if (!isValidId) {
      return {
        error: true,
      };
    }
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return {
        error: true,
      };
    }
    const newComment = await CommentsModel.create({
      name,
      comment,
      blogId,
      parentId,
    });

    return newComment;
  }
}
