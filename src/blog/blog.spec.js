import { BlogModel, CommentsModel } from "./blog.model";
import { BlogService } from "./blog.service";

describe("When data is valid", () => {
  const expected = [
    {
      _id: "62d9c18fe68b3a5a7ea8104f",
      title: "blog title",
      content: "blog test",
      created_at: "2022-07-21T21:13:51.535Z",
      updatedAt: "2022-07-22T06:29:32.323Z",
      __v: 4,
      ble: "62d9c18fe68b3a5a7ea8104f",
    },
  ];
  beforeAll(() => {
    BlogModel.aggregate = jest.fn().mockResolvedValue(expected);
    BlogModel.countDocuments = jest.fn().mockResolvedValue(3);
    BlogModel.count = jest.fn().mockResolvedValue(1);
    BlogModel.create = jest.fn().mockResolvedValue({
      _id: "65d9c18fe68b3a5a7ea81042",
      title: "test title",
      content: "test content",
    });
  });

  it("getBlogs Should return entries without query", async () => {
    await expect(BlogService.getBlogs(1)).resolves.toEqual({
      count: 3,
      blogs: expected,
    });
  });

  it("getBlogs Should return entries with query", async () => {
    await expect(BlogService.getBlogs(1, "blog")).resolves.toEqual({
      count: 1,
      blogs: expected,
    });
  });

  it("get single Blog Should return entries", async () => {
    BlogModel.findById = jest.fn().mockResolvedValue({
      _id: "62db425b2eef34b76fbda359",
      title: "test title",
      content: "test content",
    });
    await expect(
      BlogService.getBlog("62db425b2eef34b76fbda359")
    ).resolves.toEqual(expected);
  });

  it("create Blog Should return object", async () => {
    await expect(
      BlogService.createBlog({ title: "blog title", content: "blog test" })
    ).resolves.toEqual({
      _id: "65d9c18fe68b3a5a7ea81042",
      title: "test title",
      content: "test content",
    });
  });
});

it("create comments Should return object if postId exist", async () => {
  BlogModel.findById = jest.fn().mockResolvedValue({
    _id: "62d9c18fe68b3a5a7ea8104f",
    title: "test title",
    content: "test content",
  });
  CommentsModel.create = jest.fn().mockResolvedValue({
    name: "Temi another",
    comment: "Temi another",
  });
  await expect(
    BlogService.postComment("62d9c18fe68b3a5a7ea8104f", {
      name: "test name",
      comment: "test comment",
      parentId: "62d9c18fe68b3a5a7ea8104f",
    })
  ).resolves.toEqual({
    name: "Temi another",
    comment: "Temi another",
  });
});

it("create comments Should return error if postId does not exist or incorrect", async () => {
  BlogModel.findById = jest.fn().mockResolvedValue({});
  await expect(
    BlogService.postComment("1234", {
      name: "test name",
      comment: "test comment",
      parentId: "62d9c18fe68b3a5a7ea8104f",
    })
  ).resolves.toEqual({ error: true });
});
