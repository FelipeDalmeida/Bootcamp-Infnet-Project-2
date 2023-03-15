import mysql from "mysql2/promise"
import {connectionConfig} from './conectionConfig';

const connectionLimit=10;

export const databasePool = mysql.createPool({
    ...connectionConfig,
    connectionLimit,
  });