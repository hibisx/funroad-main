import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

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
      <div className="px-4 py-2">Login</div>
      <div className="absolute z-100 right-0 top-0.5">
        {isOpen && (
          <div className="flex bg-white border rounded-md overflow-hidden">
            <Link href="/sign-up">
              <Button variant="sidebar" className="border-r">
                New account
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="sidebar">Login</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
