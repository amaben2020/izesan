"use client";

import Login from "@/components/login";
import { addUser, getUserList } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useCookies } from "react-cookie";
function Home() {
  // lazy initialization

  const router = useRouter();
  const users = getUserList();
  console.log(users);
  const [loggedIn, setLoggedIn] = useState(false);
  const id = useId();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const userCookie = cookies["user"];

    const userExistsInDb =
      Array.isArray(users) &&
      users?.find((user) => user?.id === userCookie?.id);

    if (
      typeof userExistsInDb === "undefined" &&
      !userExistsInDb?.email?.length
    ) {
      router.push("/login");
    }
  }, [cookies, router, users]);

  const handleLogin = () => {
    setLoggedIn(true);
    addUser({
      name: "Ben",
      email: "amaben2020@ds.cc",
      role: "user",
      id,
    });
    setCookie("user", {
      name: "Ben",
      email: "amaben2020@ds.cc",
      role: "user",
      id,
    });
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <h1>User Management System</h1>
          {/* <UserList /> */}
          {/* <AddUser isEmailUnique={isEmailUnique} /> */}
          {/* <UpdateUser /> */}
          {/* <DeleteUser /> */}
        </>
      )}
    </div>
  );
}

export default Home;
