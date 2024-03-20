export const mapSchemaTypeToInquirer = (type: string): string => {
  switch (type) {
    case 'string':
      return 'input';
    case 'number':
      return 'input';
    default:
      return 'input';
  }
};
