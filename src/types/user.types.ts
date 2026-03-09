export type RoleEnum = 'ADMIN' | 'USER' | 'ROOT';

export type AccountStatus = 'ACTIVE' | 'EXPIRED' | 'INACTIVE' | 'REVOKED';

export type AccountTier = 'FREE' | 'PAYMENT';

export interface UserWithAccount {
  id: string
  name: string
  email: string
  cpf: string | null
  phone: string | null
  createdAt: string 
  role: RoleEnum
  workspaceName?: string;
  accountStatus: AccountStatus
  accountTier: AccountTier
  avatarUrl?: string | null
  bannerUrl?: string | null 
}