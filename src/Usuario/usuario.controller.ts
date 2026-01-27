import { orm } from '../shared/db/orm.js';
import { Request, Response } from 'express';
import { Usuario } from './usuario.entity.js';
import jwt from 'jsonwebtoken';
import { RequestContext } from '@mikro-orm/core';

//Ponemos el ! pq confío en que acá SIEMPRE hay un EntityManager --> app.ts tiene el RequestContext.create
const em = RequestContext.getEntityManager()!;

async function findAll(req: Request, res: Response) {
  try {
    const usuarios = await em.find(Usuario, {});
    res.status(200).json({ message: 'Found all usuarios', data: usuarios });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const usuario = await em.findOneOrFail(Usuario, { id });
    res.status(200).json({ message: 'Found usuario', data: usuario });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const email = req.body.email;
    const existeUsuario = await em.findOne(Usuario, { email });
    if (existeUsuario) {
      return res.status(400).json({ message: 'El mail ya esta registrado' });
    }
    const usuario = em.create(Usuario, req.body);
    await em.persistAndFlush(usuario);
    res.status(201).json({ message: 'Usuario created', data: usuario });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const email = req.body.email;
    const existeUsuario = await em.findOne(Usuario, { email });
    if (existeUsuario && existeUsuario.id !== Number.parseInt(req.params.id)) {
      return res.status(400).json({ message: 'El mail ya esta registrado' });
    }
    const id = Number.parseInt(req.params.id);
    const usuario = await em.findOneOrFail(Usuario, { id });
    em.assign(usuario, req.body);
    await em.flush();
    res.status(200).json({ message: 'Usuario updated', data: usuario });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const usuario = em.getReference(Usuario, id);
    await em.removeAndFlush(usuario);
    res.status(200).json({ message: 'Usuario deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//FALTA HACER HASH DE CONTRASEÑA
async function loginUsuario(req: Request, res: Response) {
  try {
    const em = RequestContext.getEntityManager()!;
    const { email, password } = req.body;
    const usuario = await em.findOneOrFail(Usuario, { email });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    if (usuario.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    // Generar un token JWT
    console.log('Secret:', process.env.JWT_SECRET);
    const token = jwt.sign(
      {
        id: usuario.id,
        usuario: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      },
    );

    //Se guarda token en cookie HttpOnly
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      message: 'Login exitoso',
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Usuario o contraseña incorrectos' });
  }
}

export { findAll, findOne, add, update, remove, loginUsuario };
