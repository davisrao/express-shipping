"use strict";

const express = require("express");
const router = new express.Router();

const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const shipmentSchema = require("../schemas/shipmentsSchema.json")

const { shipProduct } = require("../shipItApi");

/** POST /shipments
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const { productId, name, addr, zip } = req.body;

  const result = jsonschema.validate(req.body, shipmentSchema);

  if (!result.valid) {
    let errs = result.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  };

  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });
});


module.exports = router;