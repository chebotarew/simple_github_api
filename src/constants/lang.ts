export enum UIlangs {
    loading = 'Please wait, data loading',
    Language = 'Language:',
    Created = 'Created:',
    RepositoryName = 'Repository name:',
    SearchByName = 'Search by project name...',
    UserLogin = 'User login: '
}

export const ProgramLangs: string[] = [
    'JavaScript',
    'Python',
    'PHP',
    'Java',
    'TypeScript'
]

export const getHeader = (lang: string): string => `Latest ${lang} repositories`
