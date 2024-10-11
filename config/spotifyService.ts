import {SpotifyTokenResponse} from "../types/spotify";

export const fetchSpotifyToken = async () => {
        const params = new URLSearchParams({
            "grant_type": process.env.SPOTIFY_GRANT_TYPE!,
            "client_id": process.env.SPOTIFY_CLIENT_ID!,
            "client_secret": process.env.SPOTIFY_CLIENT_SECRET!
        });
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers : {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        })

        if(!response.ok){
            throw new Error('Failed to retrieve token')
        }

        return await response.json() as SpotifyTokenResponse

}