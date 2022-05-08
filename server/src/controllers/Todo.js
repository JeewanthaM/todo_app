"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Todo_1 = __importDefault(require("../models/Todo"));
const createTodo = (req, res, next) => {
    const { title, description, status, endDate } = req.body;
    const todo = new Todo_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title,
        description,
        status,
        endDate,
    });
    return todo
        .save()
        .then((todo) => res.status(201).json({ todo }))
        .catch((error) => res.status(500).json({ error }));
};
const readTodo = (req, res, next) => {
    const todoId = req.params.todoId;
    return Todo_1.default.findById(todoId)
        .populate("title")
        .then((todo) => todo
        ? res.status(200).json({ todo })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return Todo_1.default.find()
        .then((todos) => res.status(200).json({ todos }))
        .catch((error) => res.status(500).json({ error }));
};
const updateTodo = (req, res, next) => {
    const todoId = req.params.todoId;
    return Todo_1.default.findById(todoId)
        .populate("title")
        .then((todo) => {
        if (todo) {
            todo.set(req.body);
            return todo
                .save()
                .then((todo) => res.status(201).json({ todo }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: "not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteTodo = (req, res, next) => {
    const todoId = req.params.todoId;
    return Todo_1.default.findByIdAndDelete(todoId)
        .then((todo) => todo
        ? res.status(201).json({ todo, message: "Deleted" })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createTodo, readTodo, readAll, updateTodo, deleteTodo };
