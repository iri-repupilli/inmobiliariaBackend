import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './propietario.controller.js';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
import {
  AddPropietarioSchema,
  FindOnePropietarioSchema,
  RemovePropietarioSchema,
  UpdatePropietarioSchema,
} from '../Schemas/propietario.schema.js';
export const propietarioRouter = Router();

propietarioRouter.get('/', findAll);
propietarioRouter.get(
  '/:id',
  schemaValidation(FindOnePropietarioSchema),
  findOne,
);
propietarioRouter.post('/', schemaValidation(AddPropietarioSchema), add);
propietarioRouter.put(
  '/:id',
  schemaValidation(UpdatePropietarioSchema),
  update,
);
propietarioRouter.patch(
  '/:id',
  schemaValidation(UpdatePropietarioSchema),
  update,
);
propietarioRouter.delete(
  '/:id',
  schemaValidation(RemovePropietarioSchema),
  remove,
);

//SCHEMA SWAGGER
/**
 * @swagger
 * components:
 *  schemas:
 *    Propietario:
 *      type: object
 *      required:
 *        - id
 *        - nombrePropietario
 *        - apellidoPropietario
 *        - mailPropietario
 *        - telefonoPropietario
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the Propietario
 *        nombrePropietario:
 *          type: string
 *          description: The name of the Propietario
 *        apellidoPropietario:
 *          type: string
 *          description: The last name of the Propietario
 *        mailPropietario:
 *          type: string
 *          description: The email of the Propietario
 *        telefonoPropietario:
 *          type: string
 *          description: The phone number of the Propietario
 *      example:
 *        id: 1
 *        nombrePropietario: 'Juan'
 *        apellidoPropietario: 'Perez'
 *        mailPropietario: 'juanperez@gmail.com'
 *        telefonoPropietario: '1234567890'
 * */

//TAG SWAGGER
/**
 * @swagger
 * tags:
 *  name: Propietarios
 *  description: Propietarios de inmuebles
 */

// GET ALL SWAGGER
/**
 * @swagger
 * /api/propietarios:
 *   get:
 *     summary: Return the list of all the Propietarios
 *     tags: [Propietarios]
 *     responses:
 *       200:
 *         description: The list of the Propietarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Propietario'
 */

// GET ONE SWAGGER
/**
 * @swagger
 * /api/propietarios/{id}:
 *   get:
 *     summary: Return a Propietario
 *     tags: [Propietarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Propietario id
 *     responses:
 *       200:
 *         description: Propietario found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Propietario'
 *       404:
 *         description: Propietario not found
 */

//POST SWAGGER
/**
 * @swagger
 * /api/propietarios:
 *   post:
 *    summary: Create a new Propietario
 *    tags: [Propietarios]
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Propietario'
 *    responses:
 *     201:
 *      description: new Propietario created
 *     500:
 *      description: Some server error
 *     400:
 *      description: Email already registered
 */

// DELETE SWAGGER
/**
 * @swagger
 * /api/propietarios/{id}:
 *   delete:
 *     summary: Delete a Propietario
 *     tags: [Propietarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Propietario id
 *     responses:
 *       200:
 *         description: Propietario deleted
 *       404:
 *         description: Propietario not found
 */
// UPDATE SWAGGER
/**
 * @swagger
 * /api/propietarios/{id}:
 *   put:
 *     summary: Update a Propietario
 *     tags: [Propietarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Propietario id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Propietario'
 *     responses:
 *       200:
 *         description: Propietario updated
 *       404:
 *         description: Propietario not found
 */
