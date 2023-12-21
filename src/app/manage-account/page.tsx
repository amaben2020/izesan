"use client";
import { deleteUser, getUserList, updateUser } from "@/services/userService";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageAccount = () => {
  const users = getUserList();
  const location = useSearchParams();

  const SEARCH_QUERY = "id";

  const router = useRouter();
  const searchedItem = location?.get(SEARCH_QUERY);

  const userToUpdate = users.find((user: any) => user.id === searchedItem);

  const [user, setUser] = useState({
    id: userToUpdate?.id,
    email: "",
    role: "user",
    name: "",
  });
  const roles = ["user", "admin"];
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevUser: any) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();

    if (userToUpdate?.id) {
      updateUser(user);
      toast.success("User updated successfully");

      router.push("/");
    }
  };

  useEffect(() => {
    if (!userToUpdate?.id) {
      router.push("/login");
    }
  });

  return (
    <div className="p-20 border mx-auto m-10">
      <h1 className="text-center text-4xl">User Management System</h1>

      <Link href="/">Go Back</Link>

      <h3 className="text-center text-2xl">Manage Account </h3>
      <div>
        <div className="flex justify-between flex-wrap my-4 mx-auto">
          <div
            key={userToUpdate?.id}
            className="border-2 p-10 rounded-md flex flex-col gap-y-3"
          >
            <p>Name: {userToUpdate?.name}</p>
            <p>Email: {userToUpdate?.email}</p>
            <p>Role: {userToUpdate?.role}</p>
          </div>

          <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-y-4 max-w-1/2 justify-center"
          >
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="p-3 border text-black rounded-sm"
              placeholder={userToUpdate?.email}
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
              placeholder={userToUpdate?.name}
            />
            <button type="submit" className="p-3 border">
              Update
            </button>
          </form>
        </div>

        <div>
          <button
            className="bg-red-500 text-white p-3"
            onClick={() => {
              deleteUser(userToUpdate?.id);
              toast.success("User deleted successfully");
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
