import { Router } from 'express'
import CategoryController from '../controllers/CategoryController'

const routerCategory = Router()

routerCategory.post('/', CategoryController.store)
routerCategory.get('/', CategoryController.index)
routerCategory.get('/:id', CategoryController.show)
routerCategory.put('/:id', CategoryController.update)
routerCategory.delete('/:id', CategoryController.delete)

export { routerCategory }
