import React from 'react';
import { AnimatePresence } from 'framer-motion';
import NoteItem from './NoteItem';

export default function NoteList({ notes, onToggle, onDelete, onSave }) {
  if (notes.length === 0) {
    return <p className="text-[#6b6454] dark:text-gray-500 italic text-center">No notes yet...</p>;
  }

  return (
    <ul className="space-y-3">
      <AnimatePresence>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onToggle={onToggle}
            onDelete={onDelete}
            onSave={onSave}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
