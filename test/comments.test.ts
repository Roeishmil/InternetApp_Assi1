import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comments_model";
import { Express } from "express";
import { IUser } from "../models/users_model";
import postModel from "../models/posts_model";
import userModel from "../models/users_model";

type User = IUser & { token?: string };
const testUser: User = {
  username: "testuser",
  email: "test@user.com",
  password: "testpassword",
}

var app: Express;
var testComments = [
    {
        "comment": "This is a comment",
        "owner": "Eldar",
        "postId": "safgsefdgsdfgsd"
    },
    {
        "comment": "This is another comment",
        "owner": "Eldar",
        "postId": "safgsefdgsdfgsd"
    },
    {
        "comment": "This is another comment",
        "owner": "Eldar2",
        "postId": "safgsefdgsdfgsd"
    }
];

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await postModel.deleteMany();
  await userModel.deleteMany();
  await request(app).post("/auth/register").send(testUser);
  const res = await request(app).post("/auth/login").send(testUser);
  testUser.token = res.body.refreshToken;
  testUser._id = res.body._id;
  expect(testUser.token).toBeDefined();
  await commentsModel.deleteMany();
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

let commentId = "";

describe("Comments Tests", () => {
  test("Comments test get all", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create Comment", async () => {

    const response = await request(app).post("/comments")
    .set({authorization: "JWT " + testUser.token})
    .send(testComments[0]);
    expect(response.statusCode).toBe(201);
    expect(response.body.comment).toBe(testComments[0].comment);
    expect(response.body.postId).toBe(testComments[0].postId);
    expect(response.body.owner).toBe(testComments[0].owner);
    commentId = response.body._id;
  });

  test("Test get commenty by owner", async () => {
    const response = await request(app).get("/comments?owner=" + testComments[0].owner);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].comment).toBe(testComments[0].comment);
    expect(response.body[0].postId).toBe(testComments[0].postId);
    expect(response.body[0].owner).toBe(testComments[0].owner);
  });

  test("Comments get post by id", async () => {
    const response = await request(app).get("/comments/" + commentId);
    expect(response.statusCode).toBe(200);
    expect(response.body.comment).toBe(testComments[0].comment);
    expect(response.body.postId).toBe(testComments[0].postId);
    expect(response.body.owner).toBe(testComments[0].owner);
  });
});