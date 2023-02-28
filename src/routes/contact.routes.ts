import { Router } from "express";
import ContactController from "../controllers/ContactController";

const routerContact = Router();

routerContact.post('/',ContactController.store);
routerContact.get('/', ContactController.index);
routerContact.get('/:id', ContactController.show);
routerContact.put('/:id', ContactController.update);
routerContact.delete('/:id', ContactController.delete);

export {routerContact}


