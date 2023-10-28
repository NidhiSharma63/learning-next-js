import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import App from "next/app";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <div className="gap-10 flex justify-center flex-col items-center w-full">
        <Navbar />
        <Component {...pageProps} />
      </div>
    );
  }
}

export default MyApp;
