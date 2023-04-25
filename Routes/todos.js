import express from "express";
import data from "../data";
import bodyParser from "body-parser";

const postRouter = express.Router();
postRouter.use(bodyParser.json()); // to use body object in requests

/**
 * @swagger
 * components:
 *   schemas:
 *     To Do Lists:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - body
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a todo
 *         userId:
 *           type: integer
 *           description: id of user
 *         title:
 *           type: string
 *           description: title of todo
 *         body:
 *           type: string
 *           descripton: content of todo *
 *       example:
 *         id: 1
 *         userId: 1
 *         title: my title
 *         body: my todo
 *
 */

/**
 * @swagger
 *  tags:
 *    name: To Do Lists
 *    description: todo lists of users
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Returns all posts
 *     tags: [To Do Lists]
 *     responses:
 *       200:
 *         description: the list of the todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/To Do Lists'
 */

postRouter.get("/", (req, res) => {
  res.send(data);
});

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: gets todos by id
 *     tags: [To Do Lists]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of todo
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: todos by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/To Do Lists'
 *       400:
 *         description: todo can not be found
 */

postRouter.get("/:id", (req, res) => {
  const post = data.find((post) => post.id === +req.params.id);

  if (!post) {
    res.sendStatus(404);
  }

  res.send(post);
});

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [To Do Lists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/To Do Lists'
 *     responses:
 *       200:
 *         description: The todo was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/To Do Lists'
 *       500:
 *         description: Some server error
 */

postRouter.post("/", (req, res) => {
  try {
    const post = {
      ...req.body,
      id: data.length + 1,
    };

    data.push(post);

    res.send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: updates todos by id
 *     tags: [To Do Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: todo id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/To Do Lists'
 *     responses:
 *       200:
 *         decsription: The todo was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/To Do Lists'
 *       404:
 *         description: todo was not found.
 *       500:
 *         description: Some errors happend.
 *
 */

postRouter.put("/:id", (req, res) => {
  try {
    let post = data.find((post) => post.id === +req.params.id);
    post.userId = req.body.userId;
    post.title = req.body.title;
    post.body = req.body.body;

    res.send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 *  /todos/{id}:
 *    delete:
 *      summary: removes todo from array
 *      tags: [To Do Lists]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: todo id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The todo was deleted
 *        404:
 *          description: The todo was not found
 *
 */

postRouter.delete("/:id", (req, res) => {
  let post = data.find((post) => post.id === +req.params.id);
  const index = data.indexOf(post);

  if (post) {
    data.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = postRouter;