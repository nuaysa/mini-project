"use client";

import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div
      onClick={handleLogin}
      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-green-600 transition duration-300 ease-in-out transform hover:scale-105"
    >
      Profile
    </div>
  );
};

export default LoginButton;