import { MaplifyDoc } from './models/Maplify';

declare type MaplifyResType = {
  success: boolean;
  msg?: string;
  data?: MaplifyDoc;
};
