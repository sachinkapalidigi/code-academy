const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const path = require("path");
const fs = require("fs");

const server = require("../../src/app");
const REGISTER_URL = "/v1/auth/register";
const LOGIN_URL = "/v1/auth/login";
const IMAGES_URL = "/v1/images";
process.env.NODE_ENV = "test";

describe("Image routes", () => {
  let token;
  const sampleImage = path.join(__dirname, "../../samples/sample-image.jpg");

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
      .end((err, r) => {
        chai
          .request(server)
          .post(LOGIN_URL)
          .send({
            username: registerBody.username,
            password: registerBody.password,
          })
          .end((err, res) => {
            token = res.body.data.accessToken;
            done();
          });
      });
  });

  it("GET all images of a user", (done) => {
    chai
      .request(server)
      .get(IMAGES_URL)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data.images).to.be.an("array");
        done();
      });
  });

  it("POST an image", (done) => {
    chai
      .request(server)
      .post(IMAGES_URL)
      .set("Authorization", `Bearer ${token}`)
      .attach(
        "file",
        fs.readFileSync(sampleImage),
        sampleImage.split("/").pop()
      )
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal("Image saved successfully.");
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("image");
        expect(res.body.data.image).to.have.property("id");
        done();
      });
  });

  it("GET a single image by its ID", (done) => {
    let imageId;
    chai
      .request(server)
      .post(IMAGES_URL)
      .set("Authorization", `Bearer ${token}`)
      .attach(
        "file",
        fs.readFileSync(sampleImage),
        sampleImage.split("/").pop()
      )
      .end((saveErr, saveResponse) => {
        imageId = saveResponse.body.data.image.id;
        chai
          .request(server)
          .get(`${IMAGES_URL}/${imageId}`)
          .set("Authorization", `Bearer ${token}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("data");
            expect(res.body.data.image)
              .to.have.property("id")
              .that.equals(imageId);
            done();
          });
      });
  });

  it("DELETE a single image by its ID", (done) => {
    let imageId;
    chai
      .request(server)
      .post(IMAGES_URL)
      .set("Authorization", `Bearer ${token}`)
      .attach(
        "file",
        fs.readFileSync(sampleImage),
        sampleImage.split("/").pop()
      )
      .end((saveErr, saveResponse) => {
        imageId = saveResponse.body.data.image.id;
        chai
          .request(server)
          .delete(`${IMAGES_URL}/${imageId}`)
          .set("Authorization", `Bearer ${token}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal("Image deleted successfully.");
            done();
          });
      });
  });

  // TODO: Other tests (e.g., error cases)
});
