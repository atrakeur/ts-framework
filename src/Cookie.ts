export interface ICookieOption {
    domain?: string;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    expires?: Date;
    maxAge?: number;
    signed?: boolean;
}