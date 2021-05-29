const express = require("express");
const router = express.Router();

const jobController = require("../controller/job.controller");
const locationController = require("../controller/location.controller");


router.route("/jobs")
.get(jobController.JobSearchingGetAll)
.post(jobController.addOneJob);

router.route("/jobs/:jobId")
.get(jobController.JobSerchingGetOneJob)
.put(jobController.updateOneJob)
.delete(jobController.deleteOneJob)
.patch(jobController.partialUpdate);

router.route("/jobs/:jobId/location")
.post(locationController.addLocation)
.put(locationController.updateLocation);

router.route("/jobs/:jobId/location/:locationId")
.delete(locationController.deletLocation);

module.exports = router;