// src/spotifyApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useAccessToken } from './spotifyApi';

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1/',
    prepareHeaders: async (headers) => {
      const token = await useAccessToken();
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBrowseNewReleases: builder.query({
      query: () => "browse/new-releases?limit=10",
    }),
    getSongsByGenre: builder.query({
      query: (genreId) => `browse/categories/${genreId.toLowerCase()}/playlists`,
    }),
    // getSongDetails: builder.query({
    //   query: (songId) => `tracks/${songId}`,
    // }),
    // getSongRelated: builder.query({
    //   query: (songId) => `recommendations?seed_tracks=${songId}`,
    // }),
    getArtist: builder.query({
      query: () => `search?q=a&type=artist&limit=10`,
    }),
    // getSongsBySearch: builder.query({
    //   query: (searchTerm) => `search?q=${searchTerm}&type=track`,
    // }),
    getFeaturedPlaylists : builder.query({
      query: () => `browse/featured-playlists`,
    }),
    getArtistTracksById : builder.query({
      query: (albumid) => `/artists/${albumid}/top-tracks`,
    }),
    getPlaylistTrackById : builder.query({
      query: (playlistid) => `/playlists/${playlistid}/tracks`,
    }),
  }),
});

export const {
  useGetBrowseNewReleasesQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistQuery,
  useGetSongsBySearchQuery,
  useGetFeaturedPlaylistsQuery,
  useGetArtistTracksByIdQuery,
  useGetPlaylistTrackByIdQuery
} = spotifyApi;
