const express = require("express");
const router = express.Router();
const { getContacts, createContact, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken); // Apply middleware to all routes
router.route("/").get(getContacts).post(createContact);
router.route("/:id").put(updateContact).delete(deleteContact);

module.exports = router;
