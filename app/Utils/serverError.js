export function serverError(error) {
  return error.response?.data?.message || error.message || "Unknown error occurred"
}