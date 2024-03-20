import { Schema, PropertyTypeString } from '../types';

export const parseSchemaPropertySpecAndNames = (schema: Schema) => {
  const properties = schema.properties;
  const propertyNames = Object.keys(properties);

  const spec: { [x: string]: StringConstructor | NumberConstructor } = {};

  for (let i = 0; i < propertyNames.length; i++) {
    const propertyName: string = Object.keys(properties)[i];

    const property = properties[propertyName];

    const {
      type,
      // description,
      // default: defaultValue,
      //     choices
    } = property;

    const mapTypeToConstructor = (type: PropertyTypeString) => {
      switch (type) {
        case 'string':
          return String;
        case 'number':
          return Number;
      }
    };

    spec['--' + propertyName] = mapTypeToConstructor(type);
  }

  return { spec, propertyNames };
};
