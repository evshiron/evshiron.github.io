import matter from "gray-matter";
import { readFile } from "fs/promises";
import { join } from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import { PropsWithoutRef } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import glob from "glob";
import { promisify } from "util";
import Head from "next/head";

const POSTS_DIR = `./posts`;

async function listPosts() {
  const files = await promisify(glob)(join(POSTS_DIR, "/**/*.md"));
  const routes = files.map((x) => x.replace(/\.md$/i, "").split("/").slice(-2));
  // console.log(routes);

  return routes.map((x) => ({
    params: {
      routes: x,
    },
  }));
}

async function getPostData(yyyymm: string, name: string) {
  const path = join(POSTS_DIR, yyyymm, `${name}.md`);
  const content = await readFile(path);

  // Use gray-matter to parse the post metadata section
  const matters = matter(content);

  // Use remark to convert markdown into HTML string
  const contentHtml = (
    await unified()
      .use(remarkParse)
      .use(remarkToc)
      .use(remarkHtml, { sanitize: true })
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings)
      .use(rehypeStringify)
      .process(matters.content)
  ).toString();

  // Combine the data with the id and contentHtml
  return {
    yyyymm,
    name,
    contentHtml,
    ...matters.data,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await listPosts();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postData = await getPostData(...context?.params?.routes);

  return {
    props: {
      postData,
    },
  };
};

export default function PostView(
  props: PropsWithoutRef<{
    postData: {
      yyyymm: string;
      name: string;
      contentHtml: string;
      title?: string;
    };
  }>
) {
  return (
    <>
      <Head>
        <title>{props.postData.title || props.postData.name}</title>
      </Head>
      <main className="container m-4 flex max-w-[100vw] flex-col items-stretch gap-4 rounded-lg bg-white p-4 shadow-lg sm:m-8 sm:p-8">
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: props.postData?.contentHtml }}
        ></div>
      </main>
    </>
  );
}
