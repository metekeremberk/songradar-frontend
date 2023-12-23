export async function searchSongsByName(query) {
  if (query === "") return [];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/songs/search_name?name=${query}&skip=0&limit=5`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  const searchResult = await response.json();

  return searchResult;
}

export async function searchSongsByArtist(query) {
  if (query === "") return [];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/songs/search_artist?artist=${query}&skip=0&limit=5`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  const searchResult = await response.json();

  return searchResult;
}

export async function searchAlbumsByName(query) {
  if (query === "") return [];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/albums/search_name?name=${query}&skip=0&limit=5`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  const searchResult = await response.json();

  return searchResult;
}

export async function searchAlbumsByArtist(query) {
  if (query === "") return [];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/albums/search_artist?artist=${query}&skip=0&limit=5`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  const searchResult = await response.json();

  return searchResult;
}
