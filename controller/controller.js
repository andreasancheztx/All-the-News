var express = require("express");
var router = express.Router();
var path = require("path");

var request = require("request");
var cheerio = require("cheerio");

var Article = require("..models/Article.js");
var Note = require("../models/Notes.js");

router.get("/", function (req, res) {
    res.redirect("/articles");
});

router.get("/scrape", function (req, res) {
    request("http://www.caller.com", function (error, response, html) {
        var$ = cheerio.load(html);
        var titlesArray = [];

        $(".c-entry-box--compact_title").each(function (i, element) {
            var result{ };

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            if (result.title! ==&& result.link !== "") {

                if (titlesArray.indexOf(result.title) == -1) {
                    titlesArray.push(result.title)

                    Article.count({ title: result.title }, function (err, test) {
                        if (test === 0) {
                            var entry = new Article(result);

                            entry.save(function (err, doc) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log(doc)
                                }

                            })
                        }

                    } else {
                        console.log("Article already exsists.");
                    }    
            } else {
                    console.log("Not saved to DB, missing data");
                }

            });
        res.redirect("/");
    });
});