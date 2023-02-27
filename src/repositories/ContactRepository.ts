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
  async findAll(){
    return await knex('contacts').select('*');
  }

  async findById(id:string){
   return await knex('contacts').select('*').where('id',id);
  }

  async findByEmail(email:string){

    const contactByEmail = await knex('contacts').where({email:email}).select('*').first();

    return contactByEmail;
  }

  async create({name, email, phone, category_id}:requestBodyContact){
    await knex('contacts').insert({
      id:randomUUID(),
      name,
      email,
      phone,
      category_id
    })
  }

  async delete(id:string){
    await knex('contacts').where('id',id)
  }

  async update({name,email,phone,category_id, id}:requestBodyContact){

     await knex('contacts').where('id',id).update({
      name,
      email,
      phone,
      category_id
    })
  }
}
export = new ContactRepository();
