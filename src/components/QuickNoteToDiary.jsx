import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Edit, Plus, Trash2, Save } from 'lucide-react';

export default function QuickNoteToDiary() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [text, setText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  const [sort, setSort] = useState('newest'); // 'newest', 'oldest'

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;
    const newNote = {
      id: Date.now(),
      text,
      addedToDiary: false,
      date: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setText('');
  };

  const toggleAdded = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, addedToDiary: !note.addedToDiary } : note
      )
    );
  };

  const deleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setEditingText(note.text);
  };

  const saveEdit = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, text: editingText } : note
      )
    );
    setEditingNoteId(null);
    setEditingText('');
  };

  const filteredAndSortedNotes = notes
    .filter(note => {
      if (filter === 'pending') return !note.addedToDiary;
      if (filter === 'completed') return note.addedToDiary;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  return (
    <div className="min-h-screen bg-[#f8f5e9] flex flex-col items-center py-6 px-2 sm:px-4 font-serif">
      <h1 className="text-xl sm:text-2xl mb-6 text-[#3e3a32] font-semibold">Quick Note to Diary</h1>

      <div className="bg-white/70 rounded-2xl shadow-md w-full max-w-md p-4 border border-[#e4dcc4]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your note here..."
          className="w-full h-32 p-0 text-base bg-transparent focus:outline-none text-[#3e3a32] placeholder:text-[#6b6454]"
        />
        <div className="flex justify-between mt-3 border-t border-[#e4dcc4] pt-3">
          <button
            onClick={addNote}
            className="bg-[#c2b280] text-white px-4 py-2 rounded-lg hover:bg-[#a6956b] transition flex items-center gap-2"
          >
            <Plus size={16} /> Save Note
          </button>
        </div>
      </div>

      <div className="w-full max-w-md mt-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4 sm:gap-0">
            <h2 className="text-base sm:text-lg font-medium text-[#3e3a32]">Your Notes</h2>
            <div className="flex items-center gap-2 sm:gap-4">
                <div>
                    <label htmlFor="filter" className="text-sm mr-1 sm:mr-2 text-[#3e3a32]">Filter:</label>
                    <select id="filter" value={filter} onChange={e => setFilter(e.target.value)} className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm p-1">
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort" className="text-sm mr-1 sm:mr-2 text-[#3e3a32]">Sort:</label>
                    <select id="sort" value={sort} onChange={e => setSort(e.target.value)} className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm p-1">
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>
        </div>
        {filteredAndSortedNotes.length === 0 ? (
          <p className="text-[#6b6454] italic">No notes yet...</p>
        ) : (
          <ul className="space-y-3">
            {filteredAndSortedNotes.map((note) => (
              <motion.li
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 bg-white/70 border border-[#e4dcc4] rounded-lg shadow-sm flex justify-between items-start transition ${
                  note.addedToDiary ? 'opacity-60' : ''
                }`}
              >
                {editingNoteId === note.id ? (
                  <div className="flex-grow">
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="w-full p-2 rounded-md border border-[#d8cdb2] bg-[#fffaf1] focus:outline-none focus:ring-2 focus:ring-[#c2b280] text-[#3e3a32]"
                    />
                  </div>
                ) : (
                  <div>
                    <p className={`text-[#3e3a32] whitespace-pre-line ${note.addedToDiary ? 'line-through' : ''}`}>{note.text}</p>
                    <p className="text-xs text-[#867d6a] mt-1">{new Date(note.date).toLocaleString()}</p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-2 items-center ml-2">
                  {editingNoteId === note.id ? (
                    <button onClick={() => saveEdit(note.id)}>
                      <Save size={20} className="text-blue-500 hover:text-blue-700 transition" />
                    </button>
                  ) : (
                    <>
                      <button onClick={() => toggleAdded(note.id)}>
                        <CheckCircle2
                          size={20}
                          className={`${note.addedToDiary ? 'text-green-600' : 'text-gray-400'} hover:text-green-700 transition`}
                        />
                      </button>
                      <button onClick={() => startEditing(note)}>
                        <Edit size={18} className="text-gray-500 hover:text-blue-500 transition" />
                      </button>
                      <button onClick={() => deleteNote(note.id)}>
                        <Trash2
                          size={18}
                          className="text-red-400 hover:text-red-600 transition"
                        />
                      </button>
                    </>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}