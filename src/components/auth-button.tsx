import { useState } from "react";
import Link from "next/link";

export const AuthButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onMouseEnter = () => {
    setIsOpen(true);
  };

  const onMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <p className="px-4 py-2">Login</p>
      <div className="absolute z-100 right-0 top-0">
        {isOpen && (
          <div className="w-36 bg-white overflow-hidden flex flex-col border rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]">
            <Link
              href="/sign-in"
              className="w-full text-left px-4 py-2 flex items-center underline font-medium hover:bg-sky-200"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="w-full text-left px-4 py-2 flex items-center underline font-medium hover:bg-sky-200"
            >
              New account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
