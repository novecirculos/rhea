import { Schema } from '../types';

export const getRequiredOptions = (schema: Schema): string[] => {
  return schema.required || [];
};
