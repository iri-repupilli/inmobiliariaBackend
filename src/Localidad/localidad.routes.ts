import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './localidad.controller.js';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
import {
  AddLocalidadSchema,
  FindOneLocalidadSchema,
  RemoveLocalidadSchema,
  UpdateLocalidadSchema,
} from '../Schemas/localidad.schema.js';
import { authMiddleware } from '../MiddleWares/auth.middleware.js';
import { adminMiddleware } from '../MiddleWares/admin.middleware.js';

const localidadRouter = Router();

localidadRouter.get('/', findAll);
localidadRouter.get('/:id', schemaValidation(FindOneLocalidadSchema), findOne);
localidadRouter.post(
  '/',
  authMiddleware,
  adminMiddleware,
  schemaValidation(AddLocalidadSchema),
  add,
);
localidadRouter.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  schemaValidation(UpdateLocalidadSchema),
  update,
);
localidadRouter.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  schemaValidation(RemoveLocalidadSchema),
  remove,
);

//SCHEMA SWAGGER
/**
 * @swagger
 * components:
 *   schemas:
 *     Localidad:
 *       type: object
 *       required:
 *        - id
 *        - nombre
 *        - codPostal
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Jedi
 *         codPostal:
 *           type: string
 *           description: The code postal of the localidad
 *         nombre:
 *           type: string
 *           description: The name of the Jedi
 *       example:
 *        id: 1
 *        codPostal: '2900'
 *        nombre: 'San Nicolas'
 */

//TAG SWAGGER
/**
 * @swagger
 * tags:
 *   name: Localidades
 *   description: Localidades de los inmuebles
 */

// GET ALL SWAGGER
/**
 * @swagger
 * /api/localidades:
 *   get:
 *     summary: Returns the list of all the Localidades
 *     tags: [Localidades]
 *     responses:
 *       200:
 *         description: The list of the Localidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Localidad'
 */

// GET ONE SWAGGER
/**
 * @swagger
 * /api/localidades/{id}:
 *   get:
 *     summary: Return a Localidad
 *     tags: [Localidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Localidad id
 *     responses:
 *       200:
 *         description: Localidad found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Localidad'
 *       400:
 *         description: Param validation error
 *       404:
 *         description: Localidad not found
 */

//POST SWAGGER
/**
 * @swagger
 * /api/localidades:
 *   post:
 *    summary: Create a new Localidad
 *    description: Endpoint protegido. Requiere autenticación y rol administrador.
 *    tags: [Localidades]
 *    security:
 *      - cookieAuth: []
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Localidad'
 *    responses:
 *     201:
 *      description: new Localidad created
 *     400:
 *      description: Postal code already registered
 *     401:
 *      description: Unauthorized
 *     403:
 *      description: Forbidden. Only admins allowed
 *     500:
 *      description: Some server error
 */
// DELETE SWAGGER
/**
 * @swagger
 * /api/localidades/{id}:
 *   delete:
 *     summary: Delete a Localidad
 *     description: Endpoint protegido. Requiere autenticación y rol administrador.
 *     tags: [Localidades]
 *     security:
 *      - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Localidad id
 *     responses:
 *       200:
 *         description: Localidad deleted
 *       400:
 *        description: Param validation error
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden. Only admins allowed
 *       404:
 *         description: Localidad not found
 */
// UPDATE SWAGGER
/**
 * @swagger
 * /api/localidades/{id}:
 *   put:
 *     summary: Update a Localidad
 *     description: Endpoint protegido. Requiere autenticación y rol administrador.
 *     tags: [Localidades]
 *     security:
 *      - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Localidad id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Localidad'
 *     responses:
 *       200:
 *         description: Localidad updated
 *       400:
 *        description: Body validation error
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden. Only admins allowed
 *       404:
 *        description: Localidad not found
 */

export { localidadRouter };
