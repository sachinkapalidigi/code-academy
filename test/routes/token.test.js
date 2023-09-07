const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;

const server = require("../../src/app");
process.env.NODE_ENV = "test";
const REGISTER_URL = "/v1/auth/register";
const LOGIN_URL = "/v1/auth/login";

describe("verifies token generation flow with actual mysql connection", () => {
  const registerBody = {
    username: "test_user_1",
    password: "Password@1",
    fullName: "Test User",
    age: 25,
    gender: "male",
  };

  beforeEach((done) => {
    chai
      .request(server)
      .post(REGISTER_URL)
      .send(registerBody)
      .end((err, res) => {
        done();
      });
  });

  it("Generate token successfully", (done) => {
    chai
      .request(server)
      .post(LOGIN_URL)
      .send({
        username: registerBody.username,
        password: registerBody.password,
      })
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.message).to.equal(
          "Access token generated successfully."
        );
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("accessToken");
        expect(res.body.data).to.have.property("expiresIn");
        done();
      });
  });

  // TODO: Generate token error: Invalid username

  // TODO: Generate token error: Invalid password
});
