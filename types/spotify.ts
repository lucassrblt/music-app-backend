export interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export enum FetchMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

interface FetcherParams {
    url: string;
    method: FetchMethods;
    token: string;
}

export interface FetcherInterface {
    (params: FetcherParams): Promise<Response>;
}