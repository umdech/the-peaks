import { getCookie, setCookie } from 'cookies-next'

const cookie_name = 'the_peaks_bookmark'

const option = {
    // httpOnly: true,
    maxAge: 12 * 30 * 24 * 60 * 60
}

export const getAllBookmarks = () => {
    const ids: any = getCookie(cookie_name)
    try {
        return JSON.parse(ids)
    } catch {
        return []
    }
}

export const addToBookmark = (id: string) => {
    const ids: any = getCookie(cookie_name)
    let arr: any[] = []
    try {
        arr = JSON.parse(ids)
        if (arr.indexOf(id) === -1) {
            arr.push(id)
        }
    } catch {
        arr.push(id)
    }
    setCookie(cookie_name, JSON.stringify(arr), option)
}

export const removeFromBookmark = (id: string) => {
    const ids: any = getCookie(cookie_name)
    let arr: any[] = []
    try {
        let lists: any[] = JSON.parse(ids)
        const index = lists.findIndex(x => x === id)
        if (index > -1) {
            lists.splice(index, 1)
        }
        arr = lists
        setCookie(cookie_name, JSON.stringify(arr), option)
    } catch { }
}