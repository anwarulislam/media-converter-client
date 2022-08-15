export type FileType = {
    id: string | number;
    name: string;
    type: string;
    url?: string;
    size: number;
    file?: File;
    convertTo?: string;
}