import Head from "next/head";
import Sidebar from "@components/Sidebar";
import Modal from "@components/Modal";
import Feed from "@components/Feed";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "@components/Login";
import { useRecoilState } from "recoil";
import { modalState } from "atoms/moduleAtom";
import Widget from "@components/Widget";

export async function getServerSideProps(ctx) {
  // Fetching data api widget trending
  const reqTrendingResult = await fetch("https://jsonkeeper.com/b/NKEV");
  const trendingResult = await reqTrendingResult.json();

  // Fetching data api widget follow
  const reqFollowResult = await fetch("https://jsonkeeper.com/b/WWMJ");
  const followResult = await reqFollowResult.json();

  const providers = await getProviders(); // google
  const session = await getSession(ctx); // session => cookie

  return {
    props: {
      trendingResult,
      followResult,
      providers,
      session,
    },
  };
}

export default function Home({ trendingResult, followResult, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  // Membuat redirect session
  if (!session) return <Login providers={providers} />;

  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        <Feed />
        <Widget trendingResult={trendingResult} followResult={followResult} />
        {isOpen && <Modal />}
      </main>
    </>
  );
}
