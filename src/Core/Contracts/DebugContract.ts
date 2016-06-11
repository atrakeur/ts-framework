export interface DebugContract {
    __INFO(...args: any[]);
    __DEBUG(...args: any[]);
    __WARNING(...args: any[]);
    __ERROR(...args: any[]);
    __PRINT(severity: string, ...args: any[]);
}