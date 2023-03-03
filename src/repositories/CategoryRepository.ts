import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import {
  InputCategoryDto,
  InputCategoryFindByIdDto,
  OutputCategoryDto,
} from '../dto/category.dto'

class CategoryRepository {
  async findAll(): Promise<OutputCategoryDto[]> {
    const category = await knex<OutputCategoryDto>('categories').select('*')

    return category
  }

  async findById({
    id,
  }: InputCategoryFindByIdDto): Promise<OutputCategoryDto | undefined> {
    const category = await knex<OutputCategoryDto>('categories')
      .where('id', id)
      .select('*')
      .first()

    return category
  }

  async create({ title }: InputCategoryDto): Promise<OutputCategoryDto[]> {
    const resultCategory = await knex<OutputCategoryDto>('categories')
      .insert({
        id: randomUUID(),
        title,
      })
      .returning('*')

    return resultCategory
  }

  async update(id: string, { title }: InputCategoryDto): Promise<void> {
    await knex<OutputCategoryDto>('categories').where('id', id).update({
      title,
    })
  }

  async delete({ id }: InputCategoryFindByIdDto): Promise<void> {
    await knex<OutputCategoryDto>('categories').where('id', id).del()
  }
}

export = new CategoryRepository()
