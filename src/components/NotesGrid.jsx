import NoteCard from "./NoteCard";

export default function NotesGrid({ notes }) {
  return (
    <div className="columns-3 gap-5 space-y-5">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}