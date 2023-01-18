const { User } = require("../models");

const userData = [
    {
        username: "Michael",
        password: "password"
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;

const router = require("express").Router();
