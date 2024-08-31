import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import baseUrl from "../../baseUrl/baseUrl";


const CreateNotes = () => {
  const { id } = useParams();

  const [noteText, setNoteText] = useState("");
  const [noteLink, setNoteLink] = useState("");
  const [notes, setNotes] = useState([]);

  const { mutate: CreateNote, isPending } = useMutation({
    mutationFn: async (note) => {
      const res = await fetch(
        `${baseUrl}/course/notes/create/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      return data;
    },
    onError: () => {
      toast.error("Failed to add note");
      setNoteLink("");
      setNoteText("");
    },
    onSuccess: () => {
      toast.success("Note added successfully");
    },
  });

  const handleAddNote = (e) => {
    e.preventDefault();
    const newNote = {
      text: noteText,
      link: noteLink,
    };
    CreateNote(newNote);
  };

  const { mutate: getNotes } = useMutation({
    mutationFn: async () => {
    
      const res = await fetch(`${baseUrl}/course/notes`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      return data;
    },
    onError: () => {
      setNotes([]);
    },
    onSuccess: (data) => {
      setNotes(data);
    },
  });

  useEffect(() => {
    getNotes();
  }, [getNotes]);



  return (
    <div className="min-h-screen bg-gradient-to-t from-white to-green-300 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 hover:text-green-500">
          Notes
        </h2>
        <form onSubmit={handleAddNote} className="mb-6">
          <div className="mb-4">
            <input
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              rows="4"
              placeholder="Write your note here..."
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={noteLink}
              onChange={(e) => setNoteLink(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter a link..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-500 transition duration-200"
          >
            {isPending ? <Loading /> : "Add Note"}
          </button>
        </form>
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            All Notes
          </h3>
          <ul className="space-y-4">
            {notes.length > 0 ? (
              notes.map((note) => (
                <li
                  key={note._id}
                  className="bg-gray-100 p-4 rounded-md shadow-sm"
                >
                  <p className="text-gray-800">
                    {" "}
                    <span className="text-gray-800 font-semibold">Text : </span>
                    {note.text}
                  </p>
                  <a
                    href={note.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:underline"
                  >
                    <span className="text-gray-800 font-semibold">Link : </span>{" "}
                    {note.link}
                  </a>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No notes available.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateNotes;
