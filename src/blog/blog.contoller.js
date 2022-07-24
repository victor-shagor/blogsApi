import httpStatus from "http-status";
import { BlogService } from "./blog.service";
import { BlogValidation } from "./blog.validation";

/**
 * Class representing the blog controller
 * @class BlogController
 * @description blog controller
 */
export default class BlogController {
  /**
   * This method help creates a new blog in the dattabase.
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   */
  static async createBlog(req, res) {
    try {
      const { error, value } = BlogValidation.Create(req.body);
      if (error) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ success: false, error: error.details[0].message });
      }
      const newBlog = await BlogService.createBlog(value);
      return res.status(httpStatus.CREATED).json({
        status: httpStatus.CREATED,
        message: "comment created sucessfully",
        data: newBlog,
      });
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  /**
   * This method help creates a new blog in the dattabase.
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   */
  static async getBlogs(req, res) {
    try {
      const { page, query } = req.query;
      const data = await BlogService.getBlogs(page, query);
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "blogs fetched sucessfully",
        data: data.blogs,
        count: data.count,
      });
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  /**
   * This method help creates a new blog in the dattabase.
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   */
  static async getBlog(req, res) {
    try {
      const { blogId } = req.params;
      const blogs = await BlogService.getBlog(blogId);
      if (blogs.error) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ success: false, error: "Blog not found" });
      }
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "blog fetched sucessfully",
        data: blogs,
      });
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  /**
   * This method help creates a new blog in the dattabase.
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   */
  static async postComment(req, res) {
    try {
      const { blogId } = req.params;
      const { error, value } = BlogValidation.PostComment(req.body);
      if (error) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ success: false, error: error.details[0].message });
      }
      const newComment = await BlogService.postComment(blogId, value);

      if (newComment.error) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ success: false, error: "Blog not found" });
      }

      return res.status(httpStatus.CREATED).json({
        status: httpStatus.CREATED,
        message: "blog created sucessfully",
        data: newComment,
      });
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
