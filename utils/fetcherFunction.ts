import {FetcherInterface} from "../types/spotify";

export const fetcherFunction: FetcherInterface = async ({url, method, token}) => {
    return await fetch(url, {
        method : method,
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
}