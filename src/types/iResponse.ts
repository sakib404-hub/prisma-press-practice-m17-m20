
interface IMeta {
    limit : number;
    offset : number;
    total : number;
}


export interface IResponse2<T> {
    success : boolean;
    statusCode : number;
    message : string;
    data ? : T;
    meta ? : IMeta
}
