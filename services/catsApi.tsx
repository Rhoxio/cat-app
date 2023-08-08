import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {CAT_API_KEY} from "../env.js"
import type {Cat} from "../interfaces/cat"

interface CatData{
  catData: Cat
}

export const catsApi = createApi({
  reducerPath: "catApi",
  baseQuery: fetchBaseQuery({
    prepareHeaders:(headers) =>{
      headers.set("x-api-key", CAT_API_KEY)
    },
    baseUrl: "https://api.thecatapi.com/v1/"
  }),
  endpoints: (builder) => ({
    getCatById: builder.query<CatData, string>({
      query: (breedId) => {
        return {
          url: `breeds/${breedId}`
        }
      },
      transformResponse: (response) => {
        return response
      },
    }),
    getCats: builder.query<CatData[], Array<CatData>>({
      query: (limit) => {
        return {
          url: 'breeds',
          params: {limit: limit}
        }
      },
      transformResponse:(response) =>{
        return response
      }
    })
  })
})

export const { 
  useGetCatByIdQuery,
  useGetCatsQuery
} = catsApi


