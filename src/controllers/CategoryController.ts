import { Request, Response } from 'express'
import CategoryRepository from '../repositories/CategoryRepository'

class CategoryController {
  async index(request: Request, response: Response): Promise<Response> {
    const category = await CategoryRepository.findAll()

    return response.status(200).json({ category })
  }

  async show(request: Request, response: Response) {
    const { id } = request.params

    const category = await CategoryRepository.findById({ id })

    if (!category) {
      return response
        .status(400)
        .json({ error: 'No category found with this ID' })
    }

    return response.status(200).json(category)
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { title } = request.body

    if (!title) {
      response.status(400).json({ error: 'Title cannot be null' })
    }

    const responseCategory = await CategoryRepository.create({ title })

    return response.status(201).json({ responseCategory })
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { title } = request.body

    const categoryExists = await CategoryRepository.findById({ id })

    if (!categoryExists) {
      response.status(400).json({ error: 'Category does not exist!' })
    }

    if (!title) {
      response.status(400).json({ error: 'Title cannot be null' })
    }

    await CategoryRepository.update(id, { title })

    return response.sendStatus(204)
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params

    await CategoryRepository.delete({ id })

    return response.sendStatus(204)
  }
}
export = new CategoryController()
