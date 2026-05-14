import { UserT } from 'src/types'

export type UpdateMePayloadT = Pick<UserT, 'firstName' | 'lastName'> & { roleId: number }
