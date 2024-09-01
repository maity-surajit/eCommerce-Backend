class ApiResponse {
  constructor(statusCode, data, message = "Success", size) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
    this.size = size;
  }
}

module.exports = {
  ApiResponse,
};
