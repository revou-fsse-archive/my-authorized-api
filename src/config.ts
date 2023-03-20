import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const PORT = process.env['PORT'] || 8080;
export const BCRYPT_SALT_ROUND = Number(process.env['BCRYPT_SALT_ROUND']);
