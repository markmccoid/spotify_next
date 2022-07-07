import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  PhoneOutgoingIcon,
  LightningBoltIcon,
} from "@heroicons/react/outline";
import { signOut, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  console.log("Session from Sidebar.js", session, status);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    console.log(spotifyApi?.getAccessToken());
    if (spotifyApi?.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  playlists.map((playlist) => {
    console.log(playlist.name);
  });
  return (
    <div className="text-gray-500 p-5 text-sm border-r border-black overflow-y-scroll h-screen scrollbar-hide">
      <div className="space-y-4">
        {status === "authenticated" ? (
          <button
            className="flex items-center space-x-2 hover:text-white"
            onClick={signOut}
          >
            <PhoneOutgoingIcon className="h-5 w-5" />
            <p>Sign Out</p>
          </button>
        ) : (
          <button
            className="flex items-center space-x-2 hover:text-white"
            onClick={signIn}
          >
            <LightningBoltIcon className="h-5 w-5" />
            <p>Sign In</p>
          </button>
        )}
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900 my-5" />
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900 my-5" />
        {/* Playlists from Spotify */}
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        {playlists.map((playlist) => {
          return (
            <button className="flex hover:text-white">
              <p>{playlist.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
