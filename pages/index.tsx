// import type { GetServerSideProps } from "next";
import * as fs from "fs";
import Home from "./Home";

interface IData {
  content: string;
  author: string;
  title: string;
}
/**
 * it will fetch the data on server client do need to make the api call and the data will be passed as props
 */
// export const getServerSideProps = (async () => {
//   try {
//     const data = await fetch("http://localhost:3000//api/blogs");
//     const res = await data.json();
//     return { props: { res } };
//   } catch (error) {
//     return { props: { res: [] } }; // Return empty array or some default value
//   }
// }) satisfies GetServerSideProps<{
//   res: IData[];
// }>;

/**
 * get static props
 */

export async function getStaticProps() {
  try {
    const res: IData[] = [];
    const blogsData = await new Promise<string[]>((resolve, reject) => {
      fs.readdir("blogData", (err, data) => {
        if (err) {
          reject("An Error occurred");
        } else {
          resolve(data);
        }
      });
    });
    const promises = blogsData.map((item) => {
      return new Promise<void>((resolve, reject) => {
        fs.readFile(`blogData/${item}`, "utf8", function (err, data) {
          if (err) {
            reject({ error: "no blog found" });
          } else {
            res.push(JSON.parse(data));
            resolve();
          }
        });
      });
    });
    await Promise.all(promises);
    return { props: { res } };
  } catch (error) {
    return { props: { res: [] } }; // Return empty array or some default value
  }
}

export default function Main({ res }: { res: IData[] }) {
  return <Home res={res} />;
}
