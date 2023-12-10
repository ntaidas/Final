import { createContext, useEffect, useReducer, useState } from "react";

const UsersContext = createContext();

const UsersActionTypes = {
  showUsers: "display all the users",
  register: "add new user to the DB",
  remove: "delete User",
  edit: "edit profile",
};

const reducer = (state, action) => {
  switch (action.type) {
    case UsersActionTypes.showUsers:
      return action.data;
    case UsersActionTypes.register:
      fetch(`http://localhost:8888/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      return [...state, action.data];
    case UsersActionTypes.remove:
      fetch(`http://localhost:8888/users/${action.id}`, {
        method: "DELETE",
      });
      return state.filter((el) => el.id.toString() !== action.id.toString());
    case UsersActionTypes.edit:
      return state.map((el) => {
        if (el.id.toString() === action.id.toString()) {
          fetch(`http://localhost:8888/users/${action.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              registerDate: el.registerDate,
              ...action.data,
            }),
          });
          return {
            id: action.id,
            registerDate: el.registerDate,
            ...action.data,
          };
        } else {
          return el;
        }
      });
    default:
      console.log("error", action.type, "not found");
      return state;
  }
};

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useReducer(reducer, []);
  const [loggenInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8888/users`)
      .then((res) => res.json())
      .then((data) =>
        setUsers({
          type: UsersActionTypes.showUsers,
          data: data,
        })
      );
  }, []);

  return (
    <UsersContext.Provider
      value={{
        UsersActionTypes,
        users,
        setUsers,
        loggenInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };
export default UsersContext;