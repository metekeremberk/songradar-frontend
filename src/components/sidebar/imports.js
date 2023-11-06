import Image from "next/image";

import Alert from "public/alert.svg";
import AudioPlaylist from "public/audio-playlist.svg";
import Close from "public/close.svg";
import Dashboard from "public/dashboard.svg";
import Dislike from "public/dislike.svg";
import HamburgerMenu from "public/hamburger-menu.svg";
import Like from "public/like.svg";
import Search from "public/search.svg";
import Settings from "public/settings.svg";
import User from "public/user.svg";

export {
  Alert,
  AudioPlaylist,
  Close,
  Dashboard,
  Dislike,
  HamburgerMenu,
  Like,
  Search,
  Settings,
  User,
};

export function Icon({ src, alt, onClick, className }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={20}
      height={20}
      onClick={onClick}
      className={className}
    />
  );
}
