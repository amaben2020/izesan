"use client";
import { addUser, isEmailUnique } from "@/services/userService";
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
  const roles = ["user", "admin"];

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
 

    if (isEmailUniqueInDB) {
      addUser(user);
      setCookie("user", user);
      toast.success("User created successfully");
      router.push("/login");
    }

    if (!isEmailUniqueInDB) {
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
        <select
          name="role"
          value={user.role ?? "user"}
          onChange={handleInputChange}
          className="p-3 border text-black rounded-sm"
        >
          <option value="" disabled>
            Select a role
          </option>
          {roles.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          className="p-3 border text-black rounded-sm"
          placeholder="Name"
        />
        <button type="submit" className="p-3 border">
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
