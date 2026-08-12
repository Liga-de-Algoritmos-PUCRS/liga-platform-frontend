// Espelho do payload de `GET /user/me/:id` (UserResponseDTO). Os campos de
// conta do template (cpf, phone, workspaceName, accountStatus, accountTier)
// saíram daqui: o back nunca os devolveu e nenhuma tela os lia.

export type RoleEnum = 'ADMIN' | 'USER';

export type Course = 'SOFTWARE_ENGINEERING' | 'DATA_SCIENCE' | 'COMPUTING_SCIENCE' | 'INFORMATION_SYSTEMS' | 'COMPUTING_ENGINEERING';

export type Semester = 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH' | 'FIFTH' | 'SIXTH' | 'SEVENTH' | 'EIGHTH' | 'NINTH' | 'TENTH' | 'GRADUATED';

export default interface UserWithAccount {
  id: string
  name: string
  email: string
  createdAt: string
  role: RoleEnum
  avatarUrl?: string | null
  bannerUrl?: string | null
  allTimePoints: number,
  monthlyPoints: number,
  submissions?: number;
  problemsResolved?: number;
  course?: Course;
  semester?: Semester;
}
