"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Confetti from "react-confetti";

const Dashboard = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  return (
    <main className="mx-auto max-w-6xl px-6">
      <div>
        <div className="px-10 pt-10 text-left leading-3">
          <h1 className="text-4xl font-extrabold tracking-normal">
            Dashboard Page
          </h1>
          {session?.user && (
            <>
              <p className="py-4 text-xl">Welcome : {session?.user?.name}</p>
              <p className="py-2 text-xl">Email : {session?.user?.email}</p>
              <p className="py-2 text-xl">Img URL : {session?.user?.image}</p>
              <p className="py-2 text-xl">Expires : {session?.expires}</p>
              <Confetti run={true} recycle={false} />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;