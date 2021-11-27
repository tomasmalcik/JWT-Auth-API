const router = require("express").Router()
const verify = require("./verifyToken")

router.get("/", (req, res) => {
    res.json({
        posts: {
            title: "My first post",
            description: "My fist description"
        }
    })
})

module.exports = router