export interface IUser {
  id: number
  roles?: IRole[]
  email: string
  password: string
}

export interface IUserInfo {
  id: number
  email: string
  roles?: string[]
  token: string
}
export interface ILoginRes {
  id: number
  email: string
  roles?: IRole[]
  token: string
}

export interface IRegister {
  email: string
  password: string
}

export interface ILogin {
  email: string
  password: string
}

export interface IRole {
  id: number
  value: string
  description: string
}

export interface IDeleteRole {
  userId: number
  roleValue: string
}

export interface IAddRole {
  value: string
  userId: number
}
