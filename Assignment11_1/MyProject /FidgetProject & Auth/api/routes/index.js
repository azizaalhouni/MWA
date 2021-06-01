const express = require("express");
const router = express.Router();

const fidgetController = require("../controllers/fidget-controller");
const companyController = require("../controllers/company-controller");
const controllerUsers = require("../controllers/users.controller");

router.route("/fidgets")
.get(fidgetController.getAllFidgets)
.post(controllerUsers.authenticate,fidgetController.addOneFidget);

router.route("/fidgets/:fidgetId")
.get(fidgetController.getOneFidget)
.delete(fidgetController.deleteOneFidget)
.put(fidgetController.fidgetUpdateOne);

router.route("/fidgets/:fidgetId/company")
.get(fidgetController.getOneFidget)
.post(companyController.AddCompany)
.put(companyController.updateFidgetcompany)
.delete(companyController.deleteCompany);
router.route("/fidgets/:fidgetId/company/:companyId")
 
router.route("/fidgets/title/:title")
.get(fidgetController.fidgetGetByTitle);

router.route("/users")
.post(controllerUsers.usersRegister);

router.route("/auth")
.post(controllerUsers.usersAthenticate)
module.exports = router;