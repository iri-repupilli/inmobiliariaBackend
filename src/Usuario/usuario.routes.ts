import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
import {
  AddUsuarioSchema,
  FindOneUsuarioSchema,
  RemoveUsuarioSchema,
  UpdateUsuarioSchema,
  LoginUsuarioSchema,
} from '../Schemas/usuario.schema.js';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
  loginUsuario,
} from './usuario.controller.js';
import { Router } from 'express';

const usuarioRouter = Router();

usuarioRouter.get('/', findAll);
usuarioRouter.get('/:id', schemaValidation(FindOneUsuarioSchema), findOne);
usuarioRouter.post('/', schemaValidation(AddUsuarioSchema), add);
usuarioRouter.put('/:id', schemaValidation(UpdateUsuarioSchema), update);
usuarioRouter.delete('/:id', schemaValidation(RemoveUsuarioSchema), remove);
usuarioRouter.post(
  '/login',
  schemaValidation(LoginUsuarioSchema),
  loginUsuario,
);

//SCHEMA SWAGGER
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *         - apellido
 *         - email
 *         - password
 *         - telefono
 *         - rol
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Usuario
 *         nombre:
 *           type: string
 *           description: The name of the Usuario
 *         apellido:
 *           type: string
 *           description: The surname of the Usuario
 *         email:
 *           type: string
 *           description: The email of the Usuario
 *         password:
 *           type: string
 *           description: The password of the Usuario
 *         telefono:
 *           type: string
 *           description: The phone number of the Usuario
 *         rol:
 *           type: string
 *           description: The role of the Usuario
 *       example:
 *         id: 1
 *         nombre: 'Irina'
 *         apellido: 'Repupilli'
 *         email: 'irirepupilli@gmail.com'
 *         password: 'password123'
 *         telefono: '1234567890'
 *         rol: 'admin'
 *
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginUsuario:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: irirepupilli@gmail.com
 *         password:
 *           type: string
 *           example: password123
 */

//TAG SWAGGER
/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Usuarios de la aplicacion
 */

// GET ALL SWAGGER
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Returns the list of all the Usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: The list of the Usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
// GET ONE SWAGGER
/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Return a Usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Usuario id
 *     responses:
 *       200:
 *         description: Usuario found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Some server error
 */
//POST SWAGGER
/**
 * @swagger
 * /api/usuarios:
 *   post:
 *    summary: Create a new usuario
 *    tags: [Usuarios]
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Usuario'
 *    responses:
 *     201:
 *      description: new usuario created
 *     500:
 *      description: Some server error
 *     400:
 *      description: Email already registered
 */
//POST LOGIN SWAGGER
/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Login usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUsuario'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     email:
 *                       type: string
 *                     rol:
 *                       type: string
 *       500:
 *         description: Usuario o contraseña incorrectos
 */

// DELETE SWAGGER
/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Delete a Usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Usuario id
 *     responses:
 *       200:
 *         description: Usuario deleted
 *       500:
 *         description: Some server error
 */
// UPDATE SWAGGER
/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Update a Usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Usuario id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario updated
 *       500:
 *         description: Some server error
 */
export { usuarioRouter };
