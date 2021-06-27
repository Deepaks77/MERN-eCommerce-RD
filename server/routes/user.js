const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
	res.json({
		data: "you hit user routes",
	});
});

module.exports = router;
