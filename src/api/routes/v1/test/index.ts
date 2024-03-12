import express from 'express'
import async from '../../../middlewares/async';
import { validator } from '../../../../utils/validation';
import hello from './hello';

const router = express.Router();

router.get(
  '/hello',
  hello.limiter,
  validator.query(hello.validation),
  async(hello.controller),
);

export default router;
