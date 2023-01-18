const router = require("express").Router();

const { User, Post, Comment } = require("../../models");

router.post("/login", async (req, res) => {
    try {
        const loginData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!loginData) {
            res.status(400).json({message: "Your login is incorrect."});
            return;
        }
        const validPw = loginData.checkPassword(req.body.password);
        if (!validPw) {
            res.status(400).json({message: "Your login is incorrect"});
            return;
        }
        req.session.save(() => {
            req.session.user_id = loginData.id;
            req.session.username = loginData.username;
            req.session.loggedIn = true;

            res.json({ user: loginData, message: "You have successfully logged in."});
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;