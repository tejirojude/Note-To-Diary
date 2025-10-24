import React, { useState, useEffect, useMemo } from 'react';
import NoteEditor from './note/NoteEditor';
import NoteControls from './note/NoteControls';
import NoteList from './note/NoteList';
import ThemeToggle from './ThemeToggle';

export default function QuickNoteToDiary() {
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem('notes');
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch (error) {
      console.error("Failed to parse notes from localStorage", error);
      return [];
    }
  });
  const [text, setText] = useState('');
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

  const saveNote = (id, newText) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  const filteredAndSortedNotes = useMemo(() => {
    return notes
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
  }, [notes, filter, sort]);

  return (
    <div className="min-h-screen bg-[#f8f5e9] dark:bg-gray-900 flex flex-col items-center py-6 px-2 sm:px-4 font-serif transition-colors">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl text-[#3e3a32] dark:text-gray-200 font-semibold">Quick Note to Diary</h1>
        <ThemeToggle />
      </div>

      <NoteEditor text={text} setText={setText} addNote={addNote} />

      <div className="w-full max-w-md mt-8">
        <NoteControls filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
        <NoteList 
          notes={filteredAndSortedNotes}
          onToggle={toggleAdded}
          onDelete={deleteNote}
          onSave={saveNote}
        />
      </div>
    </div>
  );
}