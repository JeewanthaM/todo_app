"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Todo_1 = __importDefault(require("../controllers/Todo"));
const Joi_1 = require("../middleware/Joi");
const router = express_1.default.Router();
router.post("/create", (0, Joi_1.ValidateJoi)(Joi_1.Schemas.todo.create), Todo_1.default.createTodo);
router.get("/get/:todoId", Todo_1.default.readTodo);
router.get("/get/", Todo_1.default.readAll);
router.patch("/update/:todoId", (0, Joi_1.ValidateJoi)(Joi_1.Schemas.todo.update), Todo_1.default.updateTodo);
router.delete("/delete/:todoId", Todo_1.default.deleteTodo);
module.exports = router;
