import { Urls } from '../../constants/githubUrls'
import { formatDateFirstYear } from '../../utils/formatDate'

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

export const searchRepositories = async (lang: string, license: string) => {
    try {
        let lastMonthDay = new Date().setMonth(new Date().getMonth() - 1)
        const res = await fetch(
            `${getUrl(
                Urls.searchRepositories
            )}?q=language:${lang.toLowerCase()}+created:>${formatDateFirstYear(
                lastMonthDay
            )}+license:${license.toLowerCase()}&sort=stars&order=desc`
        )
        const json = await res.json()
        return json
    } catch (error) {
        return error
    }
}
