const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

/**
 * 
 * @param {String} str 
 * @returns ex. foo bar to foo-bar 
 */
const parseText = str => str.replace(/\s+/g, '-').toLowerCase()

const ImageStore = multer.diskStorage({
    destination: function (req, file, callback) {
        const developerName = parseText(req.body.developer);
        const appName = parseText(req.body.name)
        const devDir = `images/${developerName}`;
        const fullDir = `images/${developerName}/${appName}`
        if(fs.existsSync(fullDir)) {
            return callback(null, fullDir);
        } else {
            if(fs.existsSync(devDir)){
                return fs.mkdir(fullDir, (error) => callback(error, fullDir))
            } else {
                return fs.mkdir(devDir, () => {
                    fs.mkdir(fullDir, (error) => callback(error, fullDir))
                });
            }
        }
    },
    filename: function (req, file, callback) {
        const fileName = parseText(file.originalname)
        callback(null, Date.now() + "-" + fileName);
    },
});
const upload = multer({ storage: ImageStore })

router.post(
    "/add",
    upload.fields([{ name: "logo", maxCount: 1 }, { name: "screenshots", maxCount: 3 }]),
    (req, res) => {
        console.log("FILE", req.files)
        console.log("DATA", req.body.name)
        res.redirect("/")
    }
);


module.exports = router