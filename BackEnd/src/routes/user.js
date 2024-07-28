const status = require("http-status")
const { Router } = require("express")
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const controller = require("./../controller/user")

router.get('/', controller.getAll)

router.get('/:id', controller.getById);

router.post('/', controller.create)

router.put('/:id', controller.update)

router.delete('/:id', controller.deleteEntity)

router.post('/login', controller.login)


module.exports = router