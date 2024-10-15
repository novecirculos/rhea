export type EnumValue<T> = {
 name: string;
 index: number;
} & T;

export const createEnum = <
 T extends Record<string, any>,
 U extends Record<string, any> = {}
>(
 obj: T,
 options: { defaultFields?: U } = {}
): { [K in keyof T]: EnumValue<U & T[K]> } =>
 Object.entries(obj).reduce((acc, [key, value], index) => {
   if (/[a-z]/.test(key)) {
     throw new Error(
       `Enum keys must be uppercase. Found lowercase letter in key: ${key}`,
     );
   }

   if (acc[key as keyof T]) {
     throw new Error(`Duplicate key found in enum: ${key}`);
   }

   return {
     ...acc,
     [key]: {
       ...options.defaultFields,
       name: key,
       index,
       ...value,
     },
   };
 }, {} as { [K in keyof T]: EnumValue<U & T[K]> });

export const createGetByPropValueForEnumAndPropName = <
 T extends Record<string, EnumValue<any>>,
 P extends keyof T[keyof T]
>(
 params: { enumDefinition: T; propName: P }
) => (value: T[keyof T][P]): T[keyof T] | undefined =>
 Object.values(params.enumDefinition).find(
   (instance) => instance[params.propName] === value,
 );