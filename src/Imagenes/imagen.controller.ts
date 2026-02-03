import { Imagen } from './imagen.entity.js';
import { orm } from '../shared/db/orm.js';
import { Request, Response } from 'express';
import { Inmueble } from '../Inmueble/inmueble.entity.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const imagenes = await em.find(Imagen, {});
    res.status(200).json({ message: 'Found all imagenes', data: imagenes });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const imagen = await em.findOneOrFail(Imagen, { id });
    res.status(200).json({ message: 'Found imagen', data: imagen });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getImagenesByInmueble(req: Request, res: Response) {
  try {
    const inmuebleId = Number(req.params.id);

    const inmueble = await em.findOne(Inmueble, { id: inmuebleId });

    if (!inmueble) {
      return res.status(404).json({ message: 'Inmueble no encontrado' });
    }

    const imagenes = await em.find(Imagen, { inmueble });

    return res.status(200).json({
      message: 'Imágenes encontradas',
      data: imagenes,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

async function addImagenToInmueble(req: Request, res: Response) {
  try {
    const inmuebleId = Number(req.params.id);
    console.log('inmueble id: ', inmuebleId);
    const inmueble = await em.findOne(Inmueble, { id: inmuebleId });

    if (!inmueble) {
      return res.status(404).json({ message: 'Inmueble no encontrado' });
    }

    //1. verificar el archivo
    if (!req.file) {
      return res.status(400).json({ message: 'No se envio el archivo' });
    }
    const file = req.file as any;
    console.log('FILE: ', req.file);

    //2. Cloudinary ya subió la imagen automáticamente
    const imagen = em.create(Imagen, {
      url: (req.file as any).path, // URL pública
      publicId: (req.file as any).filename,
      inmueble,
    });
    await em.persistAndFlush(imagen);

    res.status(201).json({
      message: 'Imagen subida correctamente',
      data: imagen,
    });
  } catch (error: any) {
    console.log('ERROR COMPLETO:', error);
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const imagen = await em.findOneOrFail(Imagen, id);

    if (!imagen) {
      res.status(404).json({ message: 'Imagen not found' });
    }

    // 1. borrar en Cloudinary
    await cloudinary.uploader.destroy(imagen.publicId);

    // 2. Borrar en db
    await em.removeAndFlush(imagen);

    res.status(200).json({ message: 'Imagen deleted successfully' });
  } catch (error: any) {
    console.log('Error: ', error);
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const imagen = await em.findOneOrFail(Imagen, id);
    em.assign(imagen, req.body);
    await em.flush();
    res
      .status(200)
      .json({ message: 'Imagen updated successfully', data: imagen });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  findAll,
  findOne,
  remove,
  update,
  addImagenToInmueble,
  getImagenesByInmueble,
};
