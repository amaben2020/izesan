"use client";
import { addUser } from "@/services/userService";
import { useId, useState } from "react";
import { useCookies } from "react-cookie";

const Login = () => {
  const id = useId();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState({
    id,
    email: "",
    role: "",
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

  const handleLogin = () => {
    addUser(user);
    setCookie("user", user);
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
          value={user.role}
          onChange={handleInputChange}
          className="p-3 border text-black rounded-sm"
          placeholder="Select a role"
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
