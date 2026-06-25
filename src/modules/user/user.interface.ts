export interface PayLoad {
    name : string;
    email : string;
    password : string;
    profilePhoto : string;
}

export interface UpdatePayLoad {
    name? : string;
    email : string;
    bio? : string;
    profilePhoto? : string; 
}