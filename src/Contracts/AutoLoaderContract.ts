export interface AutoLoaderContract {
    getLookupPath();
    loadFile(filename: string);
}