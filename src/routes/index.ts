import { Router } from "express";
import { routerContact } from "./contact.routes";

const router = Router();
router.use('/contacts',routerContact);

export {router}
