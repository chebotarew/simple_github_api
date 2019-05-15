import { Urls } from '../../constants/githubUrls'

const baseUrl = `https://api.github.com`

export const getUrl = (url: string): string => {
    return `${baseUrl}${url}`
}

export const getAllRepositories = async () => {
    try {
        const res = await fetch(getUrl(Urls.repositories))
        const json = await res.json()
        return json
    } catch (error) {
        return error
    }

}

export const searchRepositories = async (lang: string) => {
    try {
        const res = await fetch(`${getUrl(Urls.searchRepositories)}?q=language:${lang.toLowerCase()}+created:>2019-05-14`)
        const json = await res.json()
        return json
    } catch (error) {
        return error
    }

}