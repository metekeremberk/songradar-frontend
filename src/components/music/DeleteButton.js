"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ThrashSVG from "@/components/svg/ThrashSVG";

async function deleteSong(data) {
  const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/music/songs`, {
    cache: "no-store",
    method: "DELETE",
    body: JSON.stringify(data),
  });

  return response;
}

async function deleteAlbum(data) {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/music/albums`,
    {
      cache: "no-store",
      method: "DELETE",
      body: JSON.stringify(data),
    },
  );

  return response;
}

export default function DeleteButton({ name, item, className, size = 30 }) {
  return (
    <div className={className}>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="-mb-1.5 p-1">
            <ThrashSVG size={size} color="#f9fafb" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this{" "}
              {name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <button
                onClick={() => {
                  if (name === "album") deleteAlbum(item);
                  else if (name === "song") deleteSong(item);
                }}
              >
                Delete
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
