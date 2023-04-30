import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import {
  InputContactDto,
  InputContactFindByIdDto,
  InputContactFindEmailDto,
  OutputContactDto,
} from '../dto/contact.dto'

class ContactRepository {
  async findAll(orderBy: string): Promise<OutputContactDto[]> {
    const direction = orderBy.toLocaleUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const contacts = await knex('contacts')
      .join('categories', 'contacts.category_id', 'categories.id')
      .select(
        'contacts.id',
        'contacts.name',
        'contacts.phone',
        'contacts.email',
        'categories.title',
      )
      .orderBy('contacts.name', direction)
    return contacts
  }

  async findById({
    id,
  }: InputContactFindByIdDto): Promise<OutputContactDto | undefined> {
    const contactById = await knex<OutputContactDto>('contacts')
      .select('*')
      .where('id', id)
      .first()
    return contactById
  }

  async findByEmail({
    email,
  }: InputContactFindEmailDto): Promise<OutputContactDto | undefined> {
    const contactByEmail = await knex<OutputContactDto>('contacts')
      .where({ email })
      .select('*')
      .first()

    return contactByEmail
  }

  async create({
    name,
    email,
    phone,
    category_id,
  }: InputContactDto): Promise<void> {
    const id = randomUUID()
    await knex<InputContactDto>('contacts')
      .insert({
        id,
        name,
        email,
        phone,
        category_id,
      })
      .returning('*')
  }

  async delete({ id }: InputContactFindByIdDto): Promise<void> {
    await knex<InputContactFindByIdDto>('contacts').where('id', id).del()
  }

  async update({
    name,
    email,
    phone,
    category_id,
    id,
  }: InputContactDto): Promise<void> {
    await knex<InputContactDto>('contacts').where('id', id).update({
      name,
      email,
      phone,
      category_id,
    })
  }
}
export = new ContactRepository()
