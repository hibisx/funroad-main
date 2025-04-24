import { cn } from "@/lib/utils";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className="px-6 flex items-center">
      <span
        className={cn(
          poppins.className,
          "text-3xl font-semibold bg-gradient-to-b from-stone-600 to-blue-600 text-transparent bg-clip-text",
          className
        )}
      >
        Fun Road
      </span>
    </Link>
  );
};
