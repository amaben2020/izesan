// src/components/Login.js

import { useState } from "react";

const Login = () => {
  const [verified, setVerified] = useState(false);

  const handleLogin = () => {
    setVerified(true);
    onLogin();
  };

  return (
    <div>
      {verified ? (
        <p>Welcome, Verified User!</p>
      ) : (
        <button onClick={handleLogin} className="border">
          Login
        </button>
      )}
    </div>
  );
};

export default Login;
