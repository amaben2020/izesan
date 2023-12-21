export type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};
const getUserList = () => {
  //@ts-ignore
  const userList = JSON.parse(localStorage?.getItem("users")) || [];
  return userList;
};

const addUser = (user: TUser) => {
  const userList = getUserList();
  userList.push(user);
  localStorage.setItem("users", JSON.stringify(userList));
};

const updateUser = (updatedUser: TUser) => {
  const userList = getUserList();
  const updatedList = userList.map((user: TUser) =>
    user.id === updatedUser.id ? updatedUser : user,
  );
  localStorage.setItem("users", JSON.stringify(updatedList));
};

const deleteUser = (userId: string) => {
  const userList = getUserList();
  const updatedList = userList.filter((user: TUser) => user.id !== userId);
  localStorage.setItem("users", JSON.stringify(updatedList));
};

const isEmailUnique = (email: string) => {
  const userList = getUserList();
  return !userList.some((user: TUser) => user.email === email);
};

export { addUser, deleteUser, getUserList, isEmailUnique, updateUser };
