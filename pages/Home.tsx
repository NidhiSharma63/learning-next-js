import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/home.module.css";

interface IData {
  content: string;
  author: string;
  title: string;
}
const Home = ({res}: {res: IData[]}) => {
  return (
    <>
      <Head>
        <title>Your Blog Title | React, JavaScript, HTML, CSS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="In-depth tutorials and articles about React, JavaScript, HTML, CSS, and React Hooks. Learn the latest in web development and front-end frameworks."
        />
        <meta property="og:title" content="Your Blog Title" />
        <meta
          property="og:description"
          content="Expert insights and tutorials on React, JavaScript, HTML, CSS, and React Hooks."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.yourwebsite.com" />
        <meta charset="UTF-8" />
        <meta name="author" content="Nidhi Sharma" />
        <meta
          name="keywords"
          content="React, JavaScript, HTML, CSS, React Hooks, Web Development, Front-end Development"
        />
      </Head>
      <div className="gap-5 flex justify-center flex-col items-center w-full">
        <h1 className="text-5xl">Hunter Code</h1>
        <Image className={styles.homeImg} src="/images/coderImg.avif" alt="coder image" width={200} height={200} />
        <div className="mt-10 flex justify-center flex-col items-center w-full">
          <h1 className="text-2xl">Latest Blogs</h1>
          {res?.map((item: {title: string; content: string; author: string}, index: number): JSX.Element => {
            return (
              <div key={index} className="mt-10 border-2 border-black rounded border-solid p-2">
                <Link href={`/blog/${item.title}`}>
                  <h3>{item.title}</h3>
                  <hr />
                  <p>{item.content.substring(0, 100)}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
