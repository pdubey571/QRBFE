export interface Signup {
    email: string;
    business_name: string;
    business_location: string;
    business_description: string;
    phone_number: string;
}


export interface signedUpData {
    id: number;
    email: string;
    business_location: string;
    business_description: string;
    phone_number: string;
    business_name: string;
    status: number;
    updated_ts: Date;
    create_ts: Date;
}

export interface signUpReponse {
    error: string;
    status: string;
    message: string;
    data: signedUpData;
}

export interface pinGenerate {
    email: string;
    //phone: string;    
}

export interface pinGenerateResponse {
    error: string;    
    message: string;    
}

export interface validatePin {
    email: string;
    //phone: string;  
    pin: string;  
}
export interface validatedPinResponse {
    error: boolean;    
    message: string;  
    data: signedUpData;  
}

export interface userData {
    title: string;
    body: string;
    userId: string;    
}