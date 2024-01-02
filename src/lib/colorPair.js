export function getColorPairing(track) {
  const colorPairs = {
    danceability: " bg-gradient-to-r from-blue-700 to-blue-300 ",
    energy: " bg-gradient-to-r from-orange-700 to-yellow-500 ",
    key: " bg-gradient-to-r from-green-800 to-green-300 ",
    loudness: " bg-gradient-to-r from-purple-600 to-pink-500 ",
    mode: " bg-gradient-to-r from-cyan-800 to-cyan-300 ",
    speechiness: " bg-gradient-to-r from-orange-950 to-orange-700 ",
    acousticness: " bg-gradient-to-r from-stone-700 to-stone-300 ",
    instrumentalness: " bg-gradient-to-r from-amber-300 to-amber-800 ",
    liveness: " bg-gradient-to-r from-red-700 to-red-300 ",
    valence: " bg-gradient-to-r from-lime-700 to-lime-300 ",
  };

  let maxKey = "danceability";

  if (track["energy"] > track["danceability"]) {
    maxKey = "energy";
  } else if (track["key"] > track["danceability"]) {
    maxKey = "key";
  } else if (track["loudness"] > track["danceability"]) {
    maxKey = "loudness";
  } else if (track["mode"] > track["danceability"]) {
    maxKey = "mode";
  } else if (track["speechiness"] > track["danceability"]) {
    maxKey = "speechiness";
  } else if (track["acousticness"] > track["danceability"]) {
    maxKey = "acousticness";
  } else if (track["instrumentalness"] > track["danceability"]) {
    maxKey = "instrumentalness";
  } else if (track["liveness"] > track["danceability"]) {
    maxKey = "liveness";
  } else if (track["valence"] > track["danceability"]) {
    maxKey = "valence";
  }

  const gradient = colorPairs[maxKey];

  return gradient;
}
