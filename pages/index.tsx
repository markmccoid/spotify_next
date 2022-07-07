import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import { signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  useEffect(() => {}, []);

  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>My New Releases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
        {/* Sidebar */}
        {/* Center Panel */}
      </main>
      <div>{/* Player strip */}</div>
    </div>
  );
};

export default Home;
