const shortid = require('shortid');
const asyncHandler = require("express-async-handler");
const Url = require('../models/url');

exports.shortenUrl = asyncHandler(async (req, res, next) => {
    const { enterUrl } = req.body;
    if (!enterUrl) {
        throw new Error("Enter url first");

    }

    const shortUrl = shortid();
    await Url.create({
        enterUrl,
        shortUrl
    });


    // const url = new Url({ originalUrl, shortUrl});

    res.status(201).json({
        status: "success",
        message: "shorten url generated successfullt",
        enterUrl,
        shortUrl
    });
})