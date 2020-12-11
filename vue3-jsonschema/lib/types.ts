import { PropType } from 'vue';

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

export const FiledPropsDefine = {
    schema: { type: Object as PropType<Schema>, required: true }, // schema码
    value: { required: true }, // 表单项的value值
    onChange: { type: Function as PropType<(v: any) => void>, required: true}, // 表单项value值改变事件
} as const; // 这样才会认为是不可编辑的