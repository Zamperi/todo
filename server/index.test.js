import { expect } from "chai";
import { initializeTestDb, insertTestUser, getToken } from "./helper/test.js";

const url = "http://localhost:3001/";

describe("Testing basic database functionality", () => {
  let token = null;
  const testUser = { email: "foo@foo.com", password: "Password" };

  before(() => {
    initializeTestDb();
    token = getToken(testUser.email);
  });

  it("Should get all tasks", async () => {
    const response = await fetch(url);
  });

  it("should get all tasks", async () => {
    const response = await fetch(url);
    const data = await response.json();
    expect(response.status).to.equal(200);
    expect(data).to.be.an("array");
  });

  it("should create a new task", async () => {
    const newTask = { description: "Test task" };
    const response = await fetch(url + "create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ task: newTask }),
    });
    const data = await response.json();
    expect(response.status).to.equal(201);
    expect(data).to.include.all.keys(["id", "description"]);
  });
});

describe("Testing user management", () => {
  const user = { email: "foo2@test.com", password: "Password" };

  before(() => {
    insertTestUser(user.email, user.password);
  });

  it("should sign up", async () => {
    const newUser = { email: "foo@test.com", password: "Password" };
    const response = await fetch(url + "user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: newUser }),
    });
    const data = await response.json();
    expect(response.status).to.equal(201);
    expect(data).to.include.all.keys("id", "email");
  });

  it("should log in", async () => {
    const response = await fetch(url + "user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    });
    const data = await response.json();
    expect(response.status).to.equal(200);
    expect(data).to.include.all.keys(["id", "email", "token"]);
  });
});
