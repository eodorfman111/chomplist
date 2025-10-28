import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("chomplist_user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUsername(parsed.username || parsed.email || "User");
    }
  }, []);

  return (
    <div>
      <h1>Welcome {username}</h1>
    </div>
  );
};

export default Dashboard;
