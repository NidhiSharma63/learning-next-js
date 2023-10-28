import type { GetServerSideProps } from "next";
import Home from "./Home";

interface IData {
  content: string;
  author: string;
  title: string;
}
export const getServerSideProps = (async () => {
  try {
    const data = await fetch("http://localhost:3000//api/blogs");
    const res = await data.json();
    return { props: { res } };
  } catch (error) {
    return { props: { res: [] } }; // Return empty array or some default value
  }
}) satisfies GetServerSideProps<{
  res: IData[];
}>;

export default function Main({ res }: { res: IData[] }) {
  return <Home res={res} />;
}
