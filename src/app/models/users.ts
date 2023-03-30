export interface Users {
  users: Array<User>;
}

export interface User {
  id: Number;
  firstName: String;
  lastName: String;
  maidenName: String;
  age: Number;
  gender: String;
  email: String;
  phone: String;
}
