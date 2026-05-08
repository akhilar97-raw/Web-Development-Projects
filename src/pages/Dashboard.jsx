import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NotesGrid from "../components/NotesGrid";
import AddEditModal from "../components/AddEditModal";
import { notesData } from "../data/notes";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar setOpen={setOpen} />

        <h2 className="text-2xl font-bold mb-6">Pinned Notes</h2>

        <NotesGrid notes={notesData} />

        <AddEditModal open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}