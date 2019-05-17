import { Urls } from '../../constants/githubUrls'
import { formatDateFirstYear } from '../../utils/formatDate'

const baseUrl = `https://api.github.com`

export const getUrl = (url: string): string => {
    return `${baseUrl}${url}`
}

export const getAllLicenses = async () => {
    try {
        const res = await fetch(getUrl(Urls.licenses))
        const json = await res.json()
        return json
    } catch (error) {
        return error
    }
}

export const searchRepositories = async (lang: string, license: string) => {
    try {
        let lastMonthDay = new Date().setMonth(new Date().getMonth() - 1)
        let licenseAttr = license.length
            ? `+license:${license.toLowerCase()}`
            : ''
        const res = await fetch(
            `${getUrl(
                Urls.searchRepositories
            )}?q=language:${lang.toLowerCase()}+created:>${formatDateFirstYear(
                lastMonthDay
            )}${licenseAttr}&sort=stars&order=desc`
        )
        const json = await res.json()
        return json
    } catch (error) {
        return error
    }
}
