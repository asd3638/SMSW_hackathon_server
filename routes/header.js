const express = require("express");
const router = express.Router();
const { Header } = require("../models");
const sequelize = require("sequelize");

router.get("/", async (req, res, next) => {
  try {
    const header = await Header.findAll();
    res.status(200).send(header);
  } catch (error) {}
});

module.exports = router;
