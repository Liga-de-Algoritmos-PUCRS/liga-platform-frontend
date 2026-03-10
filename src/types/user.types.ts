export type RoleEnum = 'ADMIN' | 'USER' | 'ROOT';

export type AccountStatus = 'ACTIVE' | 'EXPIRED' | 'INACTIVE' | 'REVOKED';

export type AccountTier = 'FREE' | 'PAYMENT';

export type Course = 'SOFTWARE_ENGINEERING' | 'DATA_SCIENCE' | 'COMPUTING_SCIENCE' | 'INFORMATION_SYSTEMS' | 'COMPUTING_ENGINEERING';

export type Semester = 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH' | 'FIFTH' | 'SIXTH' | 'SEVENTH' | 'EIGHTH' | 'NINTH' | 'TENTH' | 'GRADUATED';

export default interface UserWithAccount {
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
  allTimePoints: number,
  monthlyPoints: number,
  submissions?: number;
  problemsResolved?: number;
  course?: Course;
  semester?: Semester;
}