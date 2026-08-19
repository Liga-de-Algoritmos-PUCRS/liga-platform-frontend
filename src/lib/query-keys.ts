export const queryKeys = {
  problems: ['problems'] as const,
  adminProblems: ['adminProblems'] as const,
  adminUsers: ['adminUsers'] as const,
  submissions: (userId?: string) => ['submissions', userId] as const,
  adminSubmissions: ['adminSubmissions'] as const,
  ranking: (view: 'monthly' | 'alltime') => ['ranking', view] as const,
} as const;
