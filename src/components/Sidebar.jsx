import { Notebook, Pin, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen border-r p-5">
      <h1 className="text-2xl font-bold text-purple-600 mb-10">
        Notes App
      </h1>

      <nav className="space-y-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100"
        >
          <Notebook size={20} />
          Notes
        </Link>

        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100">
          <Pin size={20} />
          Pinned
        </div>

        <Link
          to="/profile"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100"
        >
          <User size={20} />
          Profile
        </Link>
      </nav>
    </div>
  );
}