import { knex } from "../database";
import {randomUUID } from 'node:crypto'

interface requestBodyContact{
  name:string,
  email:string,
  phone?:string,
  category_id?:string
  id?:string
}

class ContactRepository{
  async findAll():Promise<requestBodyContact[]>{
    const contacts = await knex<requestBodyContact>('contacts').select('*');
    return contacts
  }

  async findById(id:string):Promise<requestBodyContact | undefined>{
    const contactById = await knex<requestBodyContact>('contacts').select('*').where('id',id).first();
    return contactById;
  }

  async findByEmail(email:string):Promise<requestBodyContact | undefined>{

    const contactByEmail = await knex<requestBodyContact>('contacts').where({email}).select('*').first();

    return contactByEmail;
  }

  async create({name, email, phone, category_id}:requestBodyContact):Promise<void>{
    await knex<requestBodyContact>('contacts').insert({
      id:randomUUID(),
      name,
      email,
      phone,
      category_id
    })
  }

  async delete(id:string):Promise<void>{
    await knex<requestBodyContact>('contacts').where({id}).del();
  }

  async update({name,email,phone,category_id, id}:requestBodyContact):Promise<void>{

   await knex<requestBodyContact>('contacts').where('id',id).update({
      name,
      email,
      phone,
      category_id
    })

  }
}
export = new ContactRepository();
