export interface InputContactDto {
  id?: string
  name: string
  email: string
  phone?: string | null
  category_id?: string | null
}

export interface InputContactFindByIdDto {
  id: string
}

export interface InputContactFindEmailDto {
  email: string
}

export interface OutputContactDto {
  id?: string
  name: string
  email: string
  phone?: string
  category_id?: string
}
