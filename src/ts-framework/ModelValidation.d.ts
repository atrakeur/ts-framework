/**
 * TS-Framework application
 * ModelValidation
 * This class contains all available validators
 */

export interface ModelValidation {
    type?: string;
    defaultsTo?: any;
    empty?: boolean;
    required?: boolean;
    notEmpty?: boolean;
    undefined?: boolean;
    string?: boolean;
    alpha?: boolean;
    numeric?: boolean;
    alphanumeric?: boolean;
    email?: boolean;
    url?: boolean;
    urlish?: boolean;
    ip?: boolean;
    ipv4?: boolean;
    ipv6?: boolean;
    creditcard?: boolean;
    uuid?: boolean;
    uuidv3?: boolean;
    uuidv4?: boolean;
    int?: boolean;
    integer?: boolean;
    number?: boolean;
    finite?: boolean;
    decimal?: boolean;
    float?: boolean;
    falsey?: boolean;
    truthy?: boolean;
    null?: boolean;
    notNull?: boolean;
    boolean?: boolean;
    array?: boolean;
    date?: boolean;
    hexadecimal?: boolean;
    hexColor?: boolean;
    lowercase?: boolean;
    uppercase?: boolean;
    after?: any;
    before?: any;
    regex?: string;
    notRegex?: string;
    equals?: any
    contains?: any;
    notContains?: any;
    len?: {};
    in?: any[];
    notIn?: any[];
    max?: number;
    min?: number;
    minLength?: number;
    maxLength?: number;
}