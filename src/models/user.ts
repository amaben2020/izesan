class User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";

  constructor(id: string, name: string, email: string, role: "user" | "admin") {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}

export default User;
