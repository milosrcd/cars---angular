export interface RegisterForm {
  email: string,
  password: string,
  confirmPassword: string
  fullName: string
}

export interface User {
  email: string,
  password: string,
  role: string,
  fullName: string
}
