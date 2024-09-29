class ApiErrors extends Error{
    constructor(
        statusCode,
        message = "Somthis went wrong",
        errors = [],
        stack = ""
    ){
      super(message)
      this.statusCode = statusCode
      this.date = null
      this.success = false;
      this.message = message
      this.errors = errors
    
    if(stack){
        this.stack = stack
    }else {
        Error.captureStackTrace(this, this.constructor)
    }
  }
}

export {ApiErrors}