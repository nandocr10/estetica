const status = require("http-status")
const { Router } = require("express")
const router = Router()

const controller = require("./../controller/category")

router.get('/', controller.getAll)

router.get('/:id', controller.getById);

router.post('/', controller.create)

router.put('/:id', controller.update)

router.delete('/:id', controller.deleteEntity)

module.exports = router