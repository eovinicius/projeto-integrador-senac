import { Router } from 'express';
import { CreateDocumentationController } from '../app/controllers/Documentation/CreateDocumentationController';
import { GetDocumentationController } from '../app/controllers/Documentation/GetDocumentationController';
import { DeleteDocumentationController } from '../app/controllers/Documentation/DeleteDocumentationController';
import { UpdateDocumentationController } from '../app/controllers/Documentation/UpdateDocumentationController';

const routesDocumentation = Router();

routesDocumentation.post('/', CreateDocumentationController.handle);
routesDocumentation.get('/index', GetDocumentationController.handle);
routesDocumentation.delete('/', DeleteDocumentationController.handle);
routesDocumentation.patch('/', UpdateDocumentationController.handle);

export default routesDocumentation;
