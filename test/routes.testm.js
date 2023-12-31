const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const app = require("../app.js");
const User = require("../models/user.js");
const Album = require("../models/album.js");
const Purchase = require("../models/purchase.js");
chai.use(chaiHttp);
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

/**
 * Comprehensive integration testing of the API. 
 * 
 * Install Mocha, chi-http using: npm install mocha -g, npm install chai-http Respectively.
 * run "npx mocha ./test/routes.testm.js"
 * To dynamically persist changes during Integration tests run mocha --watch.
 * run mocha tests to test multiple test files in a folder caalled test.
 * @param {Promise} mongoose.Promise Mongoose Promise Object.
 * @returns Test Result.
 */

describe("server", function () {
  this.timeout(2000); 

  const albumData = Object.freeze({
    title: "Appetite for Destruction",
    performer: "Guns N' Roses",
    cost: 20,
  });

  // beforeEach(() =>
  //   mongoose.connect("mongodb://localhost/test", {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   })
  // );

  // afterEach((done) =>
  //   mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done))
  // );

  beforeEach(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/Test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe("POST /albums", () => {
    it("should create a new Album within the database", async () => {
      const res = await chai.request(app).post("/albums").send(albumData);
      expect(res).to.be.json;
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.a("object");
      expect(res.body.data.title).to.equal(albumData.title);
      expect(res.body.data.performer).to.equal(albumData.performer);
      expect(res.body.data.cost).to.equal(albumData.cost);
    }).timeout(2000);
  });

  describe("GET /albums", () => {
    it("should return an array of all models", async () => {
      const album = await new Album(albumData).save();
      const res = await chai.request(app).get("/albums");
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(res.body.data).to.be.a("array");
      expect(res.body.data.length).to.equal(1);
      expect(res.body.data[0].title).to.equal(albumData.title);
      expect(res.body.data[0].performer).to.equal(albumData.performer);
      expect(res.body.data[0].cost).to.equal(albumData.cost);
    }).timeout(2000);
  });

  describe("GET /albums/:id", () => {
    it("should return the requested model", async () => {
      await new Album(albumData).save();
      const album = await Album.findOne();
      const res = await chai.request(app).get(`/albums/${album._id}`);
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(res.body.data.cost).to.equal(album.cost);
      expect(res.body.data.title).to.equal(album.title);
      expect(res.body.data.performer).to.deep.equal(album.performer);
    }).timeout(2000);
  });

  describe("PUT /albums/:id", () => {
    it("should update the properties that are passed in", async () => {
      await new Album(albumData).save();
      const album = await Album.findOne();
      const res = await chai
        .request(app)
        .put(`/albums/${album._id}`)
        .send({ performer: "Guns and Roses" });
      expect(res.status).to.equal(200);
      expect(res.body.data.title).to.equal(album.title);
      expect(res.body.data.performer).to.equal("Guns and Roses");
    }).timeout(2000);
  });

  describe("DELETE /albums/:id", () => {
    it("should delete the record and return a 204", async () => {
      await new Album(albumData).save();
      const album = await Album.findOne();
      const res = await chai.request(app).delete(`/albums/${album._id}`);
      expect(res.status).to.equal(204);
    }).timeout(2000);

    it("should actually remove the model from the database", async () => {
      await new Album(albumData).save();
      const album = await Album.findOne();
      const res = await chai.request(app).delete(`/albums/${album._id}`);
      expect(res.status).to.equal(204);
      expect(await Album.countDocuments()).to.equal(0);
    }).timeout(2000);
  });

  describe("POST /purchases", () => {
    it("should create a new purchase and return its relations", async () => {
      const otherAlbumData = {
        title: "Sample",
        performer: "Unknown",
        cost: 2,
      };
      const album = await new Album(otherAlbumData).save();
      const userData = { name: "James" }; // Define user data with a 'name' property
      const user = await new User(userData).save();
      const res = await chai
        .request(app)
        .post("/purchases")
        .send({ user: user._id, album: album._id });
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(res.body.data).to.haveOwnProperty("user");
      expect(res.body.data.user).to.haveOwnProperty("name");
      expect(res.body.data).to.haveOwnProperty("album");
      expect(res.body.data.album).to.haveOwnProperty("title");
      expect(res.body.data.user.name).to.equal((user.name));
      expect(res.body.data.album.title).to.equal(album.title);
    }).timeout(2000);
  });
  
});
// describe("POST /purchases", () => {
//     it("should create a new purchase and return its relations", async () => {
//       const otherAlbumData = {
//         title: "Sample",
//         performer: "Unknown",
//         cost: 2,
//       };
//       const album = await new Album(otherAlbumData).save();
//       const user = await new User({ name: "James" }).save();
//       const res = await chai
//         .request(app)
//         .post("/purchases")
//         .send({ user, album });
//       expect(res.status).to.equal(200);
//       expect(res).to.be.json;
//       expect(res.body.data).to.haveOwnProperty("user");
//       expect(res.body.data.user).to.haveOwnProperty("name");
//       expect(res.body.data).to.haveOwnProperty("album");
//       expect(res.body.data.album).to.haveOwnProperty("title");
//       expect(res.body.data.user.name).to.equal(userData.name);
//       expect(res.body.data.album.title).to.equal(album.title);
//     }).timeout(2000);
//   });