const express = require("express");
const router = express.Router();
const controllerStudens = require("../controller/controller.js");
const controllerAddress = require("../controller/addresses.controller.js");

router.route("/students").get(controllerStudens.schoolGetAll);
router.route("/students/:studentId").get(controllerStudens.schoolGetOne);
router.route("/students/:studentId/address").get(controllerAddress.addressesGetAll);
router.route("/students/:studentId/address/:addressId").get(controllerAddress.addressesGetAll);


module.exports = router;
