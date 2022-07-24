import BlogController from "../blog";

const blogRoutes = (app) => {
  app.get("/api/v1/blogs", BlogController.getBlogs);
  app.get("/api/v1/blog/:blogId", BlogController.getBlog);
  app.get("/api/v1/blog/comments/:blogId", BlogController.getBlog);
  app.post("/api/v1/blog", BlogController.createBlog);
  app.post("/api/v1/blog/comment/:blogId", BlogController.postComment);
};

export default blogRoutes;
