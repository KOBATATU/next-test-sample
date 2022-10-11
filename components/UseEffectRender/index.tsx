import axios from "axios";
import { useState, useEffect } from "react";

type User = {
  username: string;
};
const UseEffectRender = () => {
  const [user, setUser] = useState<User>();
  const fetchJSON = async () => {
    const res = await axios.get<User>(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    return res.data;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user: User = await fetchJSON();
      setUser(user);
    };
    fetchUser();
  }, []);

  return <div>{user ? <p>I am {user.username} </p> : null}</div>;
};

export default UseEffectRender;
