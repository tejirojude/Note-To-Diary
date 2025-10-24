import React from 'react';
import { Plus } from 'lucide-react';

export default function NoteEditor({ text, setText, addNote }) {
  return (
    <div className="bg-white/70 dark:bg-gray-800/50 rounded-2xl shadow-md w-full max-w-md p-4 border border-[#e4dcc4] dark:border-gray-700 mx-auto">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your note here..."
        className="w-full h-32 p-0 text-base bg-transparent focus:outline-none text-[#3e3a32] dark:text-gray-200 placeholder:text-[#6b6454] dark:placeholder:text-gray-500"
      />
      <div className="flex justify-center mt-3 border-t border-[#e4dcc4] dark:border-gray-700 pt-3">
        <button
          onClick={addNote}
          className="bg-[#c2b280] dark:bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-[#a6956b] dark:hover:bg-yellow-700 transition flex items-center gap-2"
        >
          <Plus size={16} /> Save Note
        </button>
      </div>
    </div>
  );
}
