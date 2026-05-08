import { Pin } from "lucide-react";

export default function NoteCard({ note }) {
  return (
    <div
      className="p-5 rounded-2xl shadow-sm"
      style={{ background: note.color }}
    >
      <div className="flex justify-between">
        <h2 className="font-bold text-lg">{note.title}</h2>
        {note.pinned && <Pin size={18} />}
      </div>

      <p className="text-gray-700 mt-3">{note.content}</p>
    </div>
  );
}