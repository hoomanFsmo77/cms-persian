//@ts-ignore
export enum api {
    base='http://localhost:9001/api',
    image='http://localhost:9001/storage/image/'
}
export interface IResponse {
    error:boolean,
    msg:string|null,
    data:null|any
}