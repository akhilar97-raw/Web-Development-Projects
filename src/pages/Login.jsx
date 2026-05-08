import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="h-screen flex justify-center items-center bg-[#f6f6fb]">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-[450px]">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-3">
          Notes App
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Your notes organized and secure
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-xl mb-5"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 rounded-xl mb-5"
        />

        <Link to="/dashboard">
          <button className="bg-purple-600 w-full text-white py-4 rounded-xl">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}