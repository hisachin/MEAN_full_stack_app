import express from 'express';

let router = express.Router();

import { 
    AuthController,
} from '../controllers';

router.use('/auth', AuthController);

module.exports = router;