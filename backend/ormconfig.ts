import * as dotenv from 'dotenv';

dotenv.config({path: '../.env'});

import { typeOrmConfig } from './src/core/database/database.providers';

typeOrmConfig.host = 'localhost';

module.exports = typeOrmConfig;