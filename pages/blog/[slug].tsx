import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const fetchOneBlog = async (query: string) => {
  const data = await fetch(`/api/blog?slug=${query}`);
  const response = await data.json();
  return response;
};

export default function Page() {
  const [data, setData] = useState<{ title: string; author: string; content: string }>(
    {} as { title: string; author: string; content: string }
  );
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.slug === "string") {
      fetchOneBlog(router.query.slug.replace(/\s/g, "-")).then((data) => {
        setData(data);
      });
    }
  }, [router.query.slug]);

  return (
    <>
      <Head>
        <title>{router.query.slug}</title>
      </Head>
      <div className="gap-5 flex justify-center flex-col items-center w-full">
        <h1 className="text-lg font-medium">Author : {data.author}</h1>
        <h1 className="text-lg font-medium">Title of our page is : {data.title}</h1>
        <h1 className="text-lg font-medium">Description : {data.content}</h1>
      </div>
    </>
  );
}
