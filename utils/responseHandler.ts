class ResponseHandler<T>{
    data: T;
    message: string;
    success: boolean;

    constructor(data: T, message: string, success: boolean) {
        this.data = data;
        this.message = message;
        this.success = success;
    }
}

export default ResponseHandler;