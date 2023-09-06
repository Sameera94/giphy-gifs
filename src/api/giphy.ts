import axios, { AxiosResponse } from "axios"
import { mapGiphy } from "../mappers/giphyMap"

const GIPHIES_LIMIT = 9
const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

interface GiphysResponse {
  giphys: App.Giphy[];
  offset: number;
}

function processResponse(res: AxiosResponse) {
  const { status, data } = res

  if (status === 200) {
    const { data: giphysData, pagination } = data

    return {
      giphys: giphysData.map(mapGiphy),
      offset: pagination.offset
    }
  }

  return {
    giphys: [],
    offset: 0
  }
}

export function getTrendingGiphys(
  page: number,
): Promise<GiphysResponse> {
  return axios
    .get(`${BASE_URL}/trending?api_key=${API_KEY}&offset=${page}&limit=${GIPHIES_LIMIT}&rating=g&bundle=messaging_non_clips`)
    .then(res => processResponse(res))
}

export function searchGiphys(
  page: number,
  query: string,
): Promise<GiphysResponse> {
  return axios
    .get(`${BASE_URL}/search?api_key=${API_KEY}&q=${query}&limit=${GIPHIES_LIMIT}&offset=${page}&rating=g&lang=en&bundle=messaging_non_clips`)
    .then(res => processResponse(res))
}
