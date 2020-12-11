 // Scheme类型-枚举
export enum SchemaTypes {
    'NUMBER'= 'number',
    'INTEGER' = 'integer',
    'STRING' = 'string',
    'OBJECT' = 'object',
    'ARRAY' = 'array',
    'BOOLEAN' = 'boolean'
}

type SchemaRef = { $ref: string };

export interface Schema {
    type: SchemaTypes | string; // Scheme类型-枚举 或 字符串
    const?: any;
    format?: string;
    default?: any;
    properties?: {
        [key: string]: Schema | { $ref: string }
    };
    items?: Schema | Schema[] | SchemaRef;
    dependencies?: {
        [key: string]: string[] | Schema | SchemaRef
    };
    oneOf?: Schema[];
    // vjsf?: VueJsonSchemaConfig;
    required: string[]
}