import {FetchMethods, SpotifyTokenResponse} from "../types/spotify.js";
import {fetcherFunction} from "../utils/fetcherFunction.js";

export const fetchSpotifyToken = async () => {
    const params = new URLSearchParams({
        "grant_type": process.env.SPOTIFY_GRANT_TYPE!,
        "client_id": process.env.SPOTIFY_CLIENT_ID!,
        "client_secret": process.env.SPOTIFY_CLIENT_SECRET!
    });
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    })

    if (!response.ok) {
        throw new Error('Failed to retrieve token')
    }

    return await response.json() as SpotifyTokenResponse
}

export const fetchArtists = async (token: string, artists: Array<string>) => {
    try {
        const url = `https://api.spotify.com/v1/artists?ids=${artists.join(',')}`
        const response = await fetcherFunction({url, method: FetchMethods.GET, token})

        if (!response.ok) {
            throw new Error("Error with Spotify API response")
        }
        return await response.json()
    } catch (e) {
        throw new Error(`Error while connecting with spotify api ${e}`)
    }
}


export const fetchRelatedArtists = async (token: string, id: string) => {
    try {
        const url = `https://api.spotify.com/v1/artists/${id}/related-artists`
        const response = await fetcherFunction({url, method: FetchMethods.GET, token})

        if(!response.ok){
            throw new Error("Error with Spotify API response")
        }

        return await response.json()

    }catch (e) {
        throw new Error(`Error while connecting with spotify api ${e}`)
    }
}

export const fetchArtistsAlbum = async (token: string, id: string) => {
    try{
        const url = `https://api.spotify.com/v1/artists/${id}/albums`
        const response = await fetcherFunction({url, method: FetchMethods.GET ,token})

        if(!response.ok){
            throw new Error("Error with Spotify API response")
        }

        return await response.json()
    }catch (e) {
        throw new Error(`Error while connecting with spotify api ${e}`)
    }
}

export const fetchArtistTopTracks = async (token: string, id: string) => {
    try{
        const url = `https://api.spotify.com/v1/artists/${id}/top-tracks`
        const response = await fetcherFunction({url, method : FetchMethods.GET, token})

        if(!response.ok){
            throw new Error("Error with Spotify API response")
        }

        return await response.json()
    }catch (e) {
        throw new Error(`Error while connecting with spotify api ${e}`)

    }
}