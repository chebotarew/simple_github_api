export enum UIlangs {
    loading = 'Please wait, data loading',
    Language = 'Language:',
    Created = 'Created:',
    RepositoryName = 'Repository name:'
}

export const ProgramLangs: string[] = [
    'JavaScript',
    'Python',
    'PHP',
    'Java',
    'TypeScript',
    'C'
];

export const getHeader = (lang: string): string => `Latest ${lang} repositories`