const { request } = require('express');
const express = require('express');
const router = express.Router();

const { Page } = require("../models");
const {addPage} = require('../views');
const {wikipage} = require('../views');


router.get("/", (req, res, next) => {
    res.send("to be decided");
});

router.post("/", async (req, res, next) => {
    try {
        const page = await Page.create({
          title: req.body.title,
          content: req.body.content
        });
        // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
        res.redirect(`/${page.slug}`);
      } catch (error) { next(error) }
    //res.json(req.body);
});

router.get("/add", (req, res, next) => {
    res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
    await res.json(`hit dynamic route at ${req.params.slug}`);
  });

module.exports = router;

