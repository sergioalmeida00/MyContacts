import { Request, Response } from "express";
import { z } from "zod";
import ContactRepository from "../repositories/ContactRepository";

class ContactController{
  //Listar todos os registros
  async index(request:Request, response:Response):Promise<Response>{
    const contacts = await ContactRepository.findAll();

    return response.status(200).json({contacts});
  }

  //Obter um registro
  async show(request:Request, response:Response):Promise<Response>{
     const getContactsParamSchema = z.object({
      id: z.string().uuid()
     })

     const {id} = getContactsParamSchema.parse(request.params);

     if(!id){
        return response.status(404).json({message:"Id invalid."})
     }
     const contactResult = await ContactRepository.findById({id});

     return response.status(200).json({contactResult});

  }

  //Criar um novo registro
  async store(request:Request, response:Response){
    const {name, email, phone, category_id} = request.body;

    const contactEmailExists = await ContactRepository.findByEmail({email});

    if(contactEmailExists){
      return response.status(404).json({error:'This e-mail is already in use!'});
    }

    await ContactRepository.create({name, email, phone, category_id});

    return response.sendStatus(201);
  }

  //Editar um registro
  async update(request:Request, response:Response){
    const { name, email, phone, category_id } = request.body;
    const {id} = request.params;

    const contactExists = await ContactRepository.findById({id});
    const contactEmailExists = await ContactRepository.findByEmail({email});

    if(!contactExists){
      return response.status(404).json({error:"Contact does not exist"});
    }

    if(contactEmailExists && contactEmailExists.id !== id){
      return response.status(400).json({error:'This e-mail is already in use!'});
    }

    await ContactRepository.update({name, email, phone, category_id,id});

    return response.sendStatus(204);
  }

  //Deletar um registro
  async delete(request:Request, response:Response){
    const getContactIdParamSchema = z.object({
      id:z.string().uuid()
    });

    const {id} = getContactIdParamSchema.parse(request.params);

    const contactExists = await ContactRepository.findById({id});

    if(!contactExists){
      return response.status(404).json({error:"Contact does not exist"})
    }

    await ContactRepository.delete({id});

    return response.sendStatus(204);
  }
}

export = new ContactController()
