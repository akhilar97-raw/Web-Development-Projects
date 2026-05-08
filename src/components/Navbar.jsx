import { Search } from "lucide-react";

export default function Navbar({ setOpen }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center bg-white px-4 py-3 rounded-xl w-[400px] shadow-sm">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search notes..."
          className="ml-3 outline-none w-full"
        />
      </div>

      <button
        onClick={() => setOpen(true)}
        className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700"
      >
        Add Note
      </button>
    </div>
  );
}