//@ts-ignore
export enum api {
    base='https://cms-test.iran.liara.run/api',
    image='https://cms-test.iran.liara.run/storage/image/'
}
export interface IResponse {
    error:boolean,
    msg:string|null,
    data:null|any
}