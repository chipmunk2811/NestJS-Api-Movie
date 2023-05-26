export interface typesResponse<T>{
  statusCode: number;
  message: string;
  data: T
}

export class Response<T> {
    statusCode: number;
    message: string;
    data: T;
  
    constructor(statusCode: number, message: string, data: T) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
    }
}