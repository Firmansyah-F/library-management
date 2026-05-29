export const successResponse = (data: any, message = "Success") => {
  return {
    status: "success",
    message,
    data,
  };
};

export const errorResponse = (message = "Error", error: any = null) => {
  return {
    status: "error",
    message,
    error,
  };
};
