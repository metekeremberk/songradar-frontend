import AlbumList from "@/components/music/album/AlbumList";

export default async function Page() {
  let albums = [];
  const response = await fetch(
    `${process.env.NEXT_DB_URL}/debug/albums?skip=0&limit=100`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status === 200) {
    albums = await response.json();
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-zinc-950">
      <AlbumList albums={albums} />
    </div>
  );
}
