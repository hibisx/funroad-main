"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
const Home = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.auth.session.queryOptions());

  return <div className="p-8">Home</div>;
};

export default Home;
