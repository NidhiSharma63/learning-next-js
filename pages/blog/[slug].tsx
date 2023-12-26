import * as fs from "fs";
import {GetStaticPropsContext} from "next";
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

export default function Page({res}: {res: IData}) {
  return (
    <>
      <Head>
        <title>{res.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="In-depth tutorials and articles about React, JavaScript, HTML, CSS, and React Hooks. Learn the latest in web development and front-end frameworks."
        />
        <meta property="og:title" content={res.title} />
        <meta
          property="og:description"
          content="Expert insights and tutorials on React, JavaScript, HTML, CSS, and React Hooks."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.yourwebsite.com" />
        <meta charSet="UTF-8" />
        <meta name="author" content="Nidhi Sharma" />
        <meta
          name="keywords"
          content="React, JavaScript, HTML, CSS, React Hooks, Web Development, Front-end Development"
        />
      </Head>
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
    const readFolder = await new Promise<string[]>((resolve, reject) => {
      fs.readdir("blogData", (err, data) => {
        if (err) {
          reject("An Error occured");
        } else {
          resolve(data);
        }
      });
    });
    const allPaths = readFolder.map((item: string) => {
      return {
        params: {
          slug: item.replace(/-/g, " ").replace(/\..+$/, ""),
        },
      };
    });
    return {
      paths: allPaths,
      fallback: false,
    };
  } catch (error) {
    return {props: {res: []}}; // Return empty array or some default value
  }
}
// <ParsedUrlQuery, PreviewData>
export const getStaticProps = async (context: GetStaticPropsContext) => {
  try {
    const {slug} = context.params || {};
    if (!slug) {
      throw new Error("Slug not found");
    }
    if (typeof slug === "string") {
      const res = fs.readFileSync(`blogData/${slug.replace(/ /g, "-")}.json`, "utf-8");
      return {props: {res: JSON.parse(res)}};
    }
  } catch (error) {
    return {props: {res: []}};
  }
};
