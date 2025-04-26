import { cookies as getCookies } from "next/headers";

interface Props {
  prefix: string;
  value: string;
}

export const generateAuthCookie = async ({ value, prefix }: Props) => {
  const cookies = await getCookies();
  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
};
