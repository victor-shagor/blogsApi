import request from "supertest";
import app from "../app";
const { MongoClient } = require("mongodb");

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });
  let blogId;
  it("should display welcome", async () => {
    const res = await request(app).get("/api/v1");
    expect(res.body.message).toEqual("Welcome to the Blog spot API");
    expect(res.status).toEqual(200);
  });
  it("should display route not found", async () => {
    const res = await request(app).get("/invalid/route");
    expect(res.body.message).toEqual("route not found");
    expect(res.status).toEqual(404);
  });
  it("should create blog", async () => {
    const res = await request(app).post("/api/v1/blog").send({
      title: "test title",
      content: "test content",
      date: "2022-07-23T02:09:42.837Z",
    });
    blogId = res.body.data._id;
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("data");
    expect(typeof res.body.data).toBe("object");
  });

  it("sould not create blog if date is not inputed", async () => {
    const res = await request(app).post("/api/v1/blog").send({
      title: "test title",
      content: "test content",
    });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should return all blogs", async () => {
    const res = await request(app).get("/api/v1/blogs");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("count");
  });

  it("should return single blog", async () => {
    const res = await request(app).get(`/api/v1/blog/${blogId}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should return error if blog not found", async () => {
    const res = await request(app).get(`/api/v1/blog/1234`);
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("error");
  });

  it("should create comment", async () => {
    const res = await request(app).post(`/api/v1/blog/comment/${blogId}`).send({
      name: "test name",
      comment: "test comment",
      parentId: blogId,
    });
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("data");
    expect(typeof res.body.data).toBe("object");
  });

  it("sould not create comment if input is not complete", async () => {
    const res = await request(app).post(`/api/v1/blog/comment/${blogId}`).send({
      name: "test title",
    });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });
  it("sould return not found if blogId is not valid", async () => {
    const res = await request(app).post(`/api/v1/blog/comment/1234`).send({
      name: "test name",
      comment: "test comment",
      parentId: blogId,
    });
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("error");
  });
});
