import { GetServerSidePropsContext, PreviewData } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

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
export const getServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  try {
    if (context.params !== null && context.params !== undefined) {
      const data = await fetch(`http://localhost:3000/api/blog?slug=${context.params.slug}`);
      const res = await data.json();
      return { props: { res } };
    }
  } catch (error) {
    return { props: { res: {} } }; // Return empty array or some default value
  }
};

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
