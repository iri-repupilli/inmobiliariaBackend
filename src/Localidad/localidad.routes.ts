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

const localidadRouter = Router();

localidadRouter.get('/', findAll);
localidadRouter.get('/:id', schemaValidation(FindOneLocalidadSchema), findOne);
localidadRouter.post('/', schemaValidation(AddLocalidadSchema), add);
localidadRouter.put('/:id', schemaValidation(UpdateLocalidadSchema), update);
localidadRouter.delete('/:id', schemaValidation(RemoveLocalidadSchema), remove);

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
 *   description: Localidades de propiedades
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
 *       404:
 *         description: Localidad not found
 */

//POST SWAGGER
/**
 * @swagger
 * /api/localidades:
 *   post:
 *    summary: Create a new Localidad
 *    tags: [Localidades]
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
 *     500:
 *      description: Some server error
 *     400:
 *      description: Postal code already registered
 */
// DELETE SWAGGER
/**
 * @swagger
 * /api/localidades/{id}:
 *   delete:
 *     summary: Delete a Localidad
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
 *         description: Localidad deleted
 *       404:
 *         description: Localidad not found
 */
// UPDATE SWAGGER
/**
 * @swagger
 * /api/localidades/{id}:
 *   put:
 *     summary: Update a Localidad
 *     tags: [Localidades]
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
 *       404:
 *         description: Localidad not found
 */

export { localidadRouter };
