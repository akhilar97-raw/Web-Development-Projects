import { X } from "lucide-react";

export default function AddEditModal({ open, setOpen }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[600px] p-8 rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add/Edit Note</h2>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <input
          type="text"
          placeholder="Title"
          className="w-full border p-4 rounded-xl mb-5"
        />

        <textarea
          rows="6"
          placeholder="Write your note..."
          className="w-full border p-4 rounded-xl mb-5"
        />

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-purple-300"></div>
            <div className="w-7 h-7 rounded-full bg-pink-300"></div>
            <div className="w-7 h-7 rounded-full bg-yellow-300"></div>
            <div className="w-7 h-7 rounded-full bg-green-300"></div>
          </div>

          <label className="flex gap-2 items-center">
            <input type="checkbox" />
            Pin Note
          </label>
        </div>

        <button className="bg-purple-600 text-white px-6 py-3 rounded-xl w-full">
          Save Note
        </button>
      </div>
    </div>
  );
}