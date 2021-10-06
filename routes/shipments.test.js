"use strict";

let shipItApi = require("../shipItApi")
shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    shipItApi.shipProduct.mockReturnValue(12345)
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });
    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("invalid with string Id", async function () {
    shipItApi.shipProduct.mockReturnValue(12345)
    const resp = await request(app).post("/shipments").send({
      productId: "invalid",
      name:"",
      addr: "100 Test St",
      zip: "12345-6789",
    });
    expect(resp.statusCode).toEqual(400);
  });

  test("invalid with no name", async function () {
    shipItApi.shipProduct.mockReturnValue(12345)
    const resp = await request(app).post("/shipments").send({
      productId: "invalid",
      addr: "100 Test St",
      zip: "12345-6789",
    });
    expect(resp.statusCode).toEqual(400);
  });
  test("invalid with extra field", async function () {
    shipItApi.shipProduct.mockReturnValue(12345)
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
      extra:"not allowed"
    });
    expect(resp.statusCode).toEqual(400);
  });

});
