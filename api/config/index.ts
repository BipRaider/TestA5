'use strict';

import path from 'path';
import dotenv from 'dotenv';
import { TErorr } from 'api/types/types';

try {
  dotenv.config({ path: path.join(__dirname, '../../.env') });
} catch (error) {
  const err: TErorr = new Error('Dotenv error');
  err.code = 500;
  throw err;
}

export default {
  ...process.env,
};
