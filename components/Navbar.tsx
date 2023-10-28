import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex gap-16 justify-center w-full mt-10">
      <Link href="/">Home</Link>
      <Link className="li" href="About">
        About
      </Link>
      <Link href="Contact">Contact</Link>
    </div>
  );
};

export default Navbar;
