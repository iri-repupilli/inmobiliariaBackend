import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './tipoServicio.controller.js';
import { Router } from 'express';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
import {
  AddTipoServicioSchema,
  FindOneTipoServicioSchema,
  RemoveTipoServicioSchema,
  UpdateTipoServicioSchema,
} from '../Schemas/tipoServicio.schema.js';

const tipoServicioRouter = Router();

tipoServicioRouter.get('/', findAll);
tipoServicioRouter.get(
  '/:id',
  schemaValidation(FindOneTipoServicioSchema),
  findOne,
);
tipoServicioRouter.post('/', schemaValidation(AddTipoServicioSchema), add);
tipoServicioRouter.put(
  '/:id',
  schemaValidation(UpdateTipoServicioSchema),
  update,
);
tipoServicioRouter.delete(
  '/:id',
  schemaValidation(RemoveTipoServicioSchema),
  remove,
);

//SCHEMA SWAGGER
/**
 * @swagger
 * components:
 *  schemas:
 *    TipoServicio:
 *      type: object
 *      required:
 *        - id
 *        - nombreTipoServicio
 *        - descripcionTipoServicio
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the TipoServicio
 *        nombreTipoServicio:
 *          type: string
 *          description: The name of the TipoServicio
 *        descripcionTipoServicio:
 *          type: string
 *          description: The description of the TipoServicio
 *      example:
 *        id: 1
 *        nombreTipoServicio: 'Alquiler'
 *        descripcionTipoServicio: 'Alquiler de inmuebles a largo plazo'
 */

//TAG SWAGGER
/**
 * @swagger
 * tags:
 *  name: Tipos de servicio
 *  description: Tipos de servicio de inmuebles
 * */
// GET ALL SWAGGER
/**
 * @swagger
 * /api/tiposervicios:
 *   get:
 *     summary: Returns the list of all the Tipos de servicio
 *     tags: [Tipos de servicio]
 *     responses:
 *       200:
 *         description: The list of the Tipos de servicio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoServicio'
 */
// GET ONE SWAGGER
/**
 * @swagger
 * /api/tiposervicios/{id}:
 *   get:
 *     summary: Return a Tipo de servicio
 *     tags: [Tipos de servicio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Tipo de servicio id
 *     responses:
 *       200:
 *         description: Tipo de servicio found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoServicio'
 *       404:
 *         description: Tipo de servicio not found
 */
//POST SWAGGER
/**
 * @swagger
 * /api/tiposervicios:
 *   post:
 *    summary: Create a new Tipo de servicio
 *    tags: [Tipos de servicio]
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/TipoServicio'
 *    responses:
 *     201:
 *      description: new Tipo de servicio created
 *     500:
 *      description: Some server error
 */
// DELETE SWAGGER
/**
 * @swagger
 * /api/tiposervicios/{id}:
 *   delete:
 *     summary: Delete a Tipo de servicio
 *     tags: [Tipos de servicio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Tipo de servicio id
 *     responses:
 *       200:
 *         description: Tipo de servicio deleted
 *       404:
 *         description: Tipo de servicio not found
 */
// UPDATE SWAGGER
/**
 * @swagger
 * /api/tiposervicios/{id}:
 *   put:
 *     summary: Update a Tipo de servicio
 *     tags: [Tipos de servicio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Tipo de servicio id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoServicio'
 *     responses:
 *       200:
 *         description: Tipo de servicio updated
 *       404:
 *         description: Tipo de servicio not found
 */

export { tipoServicioRouter };
