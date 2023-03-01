import { Router } from 'express'
import { routerContact } from './contact.routes'
import { routerCategory } from './category.routes'

const router = Router()
router.use('/contacts', routerContact)
router.use('/categories', routerCategory)

export { router }
