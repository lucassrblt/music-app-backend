import {SpotifyTokenResponse} from "../types/spotify";

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
        const response = await fetch(`https://api.spotify.com/v1/artists?ids=${artists.join(',')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error('Error with token')
        }
        return await response.json()
    } catch (e) {
        throw new Error(`Error while connecting with spotify api ${e}`)
    }
}


export const fetchRelatedArtists = async (token: string, id: string) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if(!response.ok){
            throw new Error('Error with token')
        }

        return await response.json()

    }catch (e) {
        throw new Error(`Error while connecting with spotify api ${e}`)
    }
}