import axios from "axios";
import { useState } from "react";

export type User = {
  username: string;
};

const MockServer = () => {
  const [clicked, setClicked] = useState<boolean>();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();

  const fetchUser = async () => {
    const res = await axios
      .get<User>("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => {
        const user = res.data;
        setUser(user);
        setClicked(true);
      })
      .catch(() => {
        setError("Fetching Failed !");
      });
  };

  const buttonText = clicked ? "Loaded" : "Start Fetch";
  return (
    <div>
      <button onClick={fetchUser} disabled={clicked}>
        {buttonText}
      </button>
      {user?.username && <h3>{user.username}</h3>}
      {error && <p data-testid="error">{error}</p>}
    </div>
  );
};

export default MockServer;
