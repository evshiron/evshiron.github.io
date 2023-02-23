import Icon from "@mdi/react";
import Link from "next/link";
import { PropsWithChildren, PropsWithoutRef } from "react";
import { mdiArrowLeft } from "@mdi/js";
import Head from "next/head";

function Section(props: PropsWithChildren) {
  return <section className="leading-loose">{props.children}</section>;
}

function SectionTitle(props: PropsWithChildren) {
  return (
    <h3 className="text-center text-xl leading-loose">{props.children}</h3>
  );
}

function Key(props: PropsWithChildren) {
  return <h4 className="text-lg">{props.children}</h4>;
}

function Value(props: PropsWithChildren) {
  return <p className="text-right italic">{props.children}</p>;
}

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>

      <main className="container relative my-4 flex max-w-[100vw] select-none flex-col items-stretch gap-4 rounded-lg bg-white p-8 pt-12 shadow-lg">
        <Link
          className="absolute left-4 top-4 flex items-center justify-center text-sm"
          href="/"
        >
          <Icon path={mdiArrowLeft} size={1} />
          Back
        </Link>

        <Section>
          <SectionTitle>📦 Languages & Skills</SectionTitle>

          <Key>😎 Proficient:</Key>
          <Value>JavaScript, TypeScript, Web, Node.js</Value>
          <Value>React, Vue</Value>

          <Key>😉 Competent:</Key>
          <Value>Rust, Python, Go, C#, Java</Value>
          <Value>Next.js, Nest.js, Unity, Unreal</Value>

          <Key>🤔 Advanced beginner:</Key>
          <Value>Kotlin, SQL, C, C++, PHP</Value>
          <Value>Android, Linux, Blender</Value>
        </Section>

        <Section>
          <SectionTitle>🔍 Interests</SectionTitle>
          <Value>Visuals, Games, AI, Open Source</Value>
        </Section>

        <Section>
          <SectionTitle>😺 Recent Activities</SectionTitle>
          <Value>Experimenting with Unreal and Unity</Value>
        </Section>
      </main>
    </>
  );
}
