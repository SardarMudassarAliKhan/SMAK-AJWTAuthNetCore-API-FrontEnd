export interface AuthenticatedResponse {
  token: string
  refreshToken: string
  user: User
  role: string[]
  status: string
}

export interface User {
  id: number
  name: string
  accountType: string
  phoneNo: any
  password: string
  userRole: string
  refreshToken: string
  refreshTokenExpiryTime: string
  isDeleted: boolean
  userName: string
  normalizedUserName: string
  email: string
  normalizedEmail: string
  emailConfirmed: boolean
  passwordHash: string
  securityStamp: string
  concurrencyStamp: string
  phoneNumber: string
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd: any
  lockoutEnabled: boolean
  accessFailedCount: number
}
