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

export default function Page({ data }: { data: IData }) {
  return (
    <>
      <Head>{/* <title>{router.query.slug}</title> */}</Head>
      <div className="gap-5 flex justify-center flex-col items-center w-full">
        {/* <h1 className="text-lg font-medium">Author : {data.author}</h1>
        <h1 className="text-lg font-medium">Title of our page is : {data.title}</h1>
        <h1 className="text-lg font-medium">Description : {data.content}</h1> */}
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
      console.log(item, "item");
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
    return { props: { res: [] } }; // Return empty array or some default value
  }
}
// <ParsedUrlQuery, PreviewData>
export const getStaticProps = async (context: GetStaticPropsContext) => {
  console.log(context, "This is context");
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
