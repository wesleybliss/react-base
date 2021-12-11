
export const headers = {
    '@todo': process.env.TODO,
}

export const makeUrl = endpoint => `${process.env.API_BASE_URL}/${endpoint}`

export const request = async (method, endpoint, data = null) => {

    const url = makeUrl(endpoint)
    const opts = {
        method,
        headers,
    }

    if (data) opts.body = data

    console.info('request', method, url, opts)
    const res = await fetch(url, opts)

    return await res.json()

}
