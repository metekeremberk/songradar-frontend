import { getGradientWithIndex } from "@/lib/colorPair";

const descriptions = [
  { desc: "This track has a high danceability rating." },
  { desc: "This track has a high energy rating." },
  { desc: "This track has a high speechiness rating." },
  { desc: "This track has a high acousticness rating." },
  { desc: "This track has a high instrumentalness rating." },
  { desc: "This track has a high liveness rating." },
  { desc: "This track has a high valence rating." },
];

export default function GradientInfo() {
  return (
    <div className="mb-3 grid grid-cols-4 gap-4 rounded bg-zinc-800/80 p-4">
      {descriptions.map((item, i) => {
        return (
          <div key={i} className="flex items-center space-x-3 ">
            <div
              className={"aspect-square h-8 w-8 " + getGradientWithIndex(i)}
            />
            <p className="text-xs opacity-60">{item.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
