import * as fs from "fs";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

// const fetchOneBlog = async (query: string) => {
//   const data = await fetch(`/api/blog?slug=${query}`);
//   const response = await data.json();
//   return response;
// };

interface IData {
  content: string;
  author: string;
  title: string;
}
// export const getServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
//   try {
//     if (context.params !== null && context.params !== undefined) {
//       const data = await fetch(`http://localhost:3000/api/blog?slug=${context.params.slug}`);
//       const res = await data.json();
//       return { props: { res } };
//     }
//   } catch (error) {
//     return { props: { res: {} } }; // Return empty array or some default value
//   }
// };

export default function Page({ res }: { res: IData }) {
  return (
    <>
      <Head>{/* <title>{router.query.slug}</title> */}</Head>
      <div className="gap-5 flex justify-center flex-col items-center w-full">
        <h1 className="text-lg font-medium">Author : {res.author}</h1>
        <h1 className="text-lg font-medium">Title of our page is : {res.title}</h1>
        <h1 className="text-lg font-medium">Description : {res.content}</h1>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const data = await fetch("http://localhost:3000/api/blogs");
    const res = await data.json();
    const allPaths = await res.map((item: IData) => {
      return {
        params: {
          slug: item.title.replace(/\s+/g, "-"),
        },
      };
    });
    // console.log(allPaths, "All paths");
    return {
      paths: allPaths,
      fallback: false,
    };
  } catch (error) {
    return { props: { res: [] } }; // Return empty array or some default value
  }
}
// <ParsedUrlQuery, PreviewData>
export const getStaticProps = async (context: GetStaticPropsContext) => {
  try {
    const { slug } = context.params || {};
    if (!slug) {
      throw new Error("Slug not found");
    }

    const data = fs.readFileSync(`blogData/${slug}.json`, "utf-8");
    return { props: { data } };
  } catch (error) {
    return { props: { res: [] } };
  }
};
