"use client";
import { TUser, getUserList, isEmailUnique } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const Login = () => {
  const id = useId();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState({
    id,
    email: "",
    role: "user",
    name: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    const isEmailUniqueInDB = isEmailUnique(user.email);

 

    const userInDb = getUserList();

    const isUserInDb = userInDb.find(
      (userInDB: TUser) => userInDB.email === user.email,
    );

    if (isUserInDb.email.length) {
      toast.success("User logged in successfully");
      router.push("/");
    }

    if (!isUserInDb.email.length) {
      toast.error("User already exists");
    }
  };

  return (
    <div className="p-20 max-w-[1000px] mx-auto">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-y-4 max-w-1/2 justify-center"
      >
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          className="p-3 border text-black rounded-sm"
          placeholder="Email"
        />

        <button type="submit" className="p-3 border">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
