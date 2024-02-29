export class CustomError{
    static createError({name="Error", cause, message,errorCode}){
        const error = new Error(message,{cause});
        error.name=name;
        error.cose=errorCode;
        throw error;
    }
}