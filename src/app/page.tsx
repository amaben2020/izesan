"use client";

import { TUser, getUserList } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
function Home() {
  const router = useRouter();
  const users = getUserList();

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const userCookie = cookies["user"];

    const userExistsInDb: TUser[] =
      Array.isArray(users) &&
      users?.find((user) => user?.id === userCookie?.id);

    if (
      typeof userExistsInDb === "undefined" &&
      //@ts-ignore
      !userExistsInDb?.email?.length
    ) {
      router.push("/login");
    }
  }, [cookies, router, users]);

  return (
    <div className="p-20 border mx-auto m-10">
      <h1 className="text-center text-4xl">User Management System</h1>

      <h3 className="text-center text-2xl">View all users </h3>
      <div>
        <div className="flex justify-between flex-wrap my-4 mx-auto">
          {Array.isArray(users) &&
            users?.length &&
            users?.map((user) => (
              <Link
                href={`manage-account?id=${user?.id}`}
                key={user.id}
                className="border-2 p-10 rounded-md flex flex-col gap-y-3"
              >
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
