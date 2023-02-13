import LinkButton from "@/components/LinkButton";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className="flex select-none flex-col items-center rounded-lg bg-white p-4 shadow-lg sm:p-8">
        <img
          className="block h-48 w-48 rounded-full shadow-md"
          src="https://avatars.githubusercontent.com/u/8800643?v=4"
          alt="avatar"
        />
        <div className="mt-4 text-lg">Evshiron Magicka</div>
        <div className="mt-2 text-gray-600">Passionate web developer</div>
        <div className="mt-8 flex justify-center gap-4">
          <LinkButton href="/portfolio">Portfolio</LinkButton>
          <LinkButton href="https://github.com/evshiron" target="_blank">GitHub</LinkButton>
        </div>
      </main>
    </>
  );
}
