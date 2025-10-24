import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Edit, Save, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function NoteItem({ note, onToggle, onDelete, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note.text);

  const handleSave = () => {
    onSave(note.id, editText);
    setIsEditing(false);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className={`p-3 bg-white/70 dark:bg-gray-800/50 border border-[#e4dcc4] dark:border-gray-700 rounded-lg shadow-sm flex justify-between items-start transition ${
        note.addedToDiary ? 'opacity-60' : ''
      }`}
    >
      {isEditing ? (
        <div className="flex-grow">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 rounded-md border border-[#d8cdb2] dark:border-gray-600 bg-[#fffaf1] dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c2b280] dark:focus:ring-yellow-500 text-[#3e3a32] dark:text-gray-200"
          />
        </div>
      ) : (
        <div className={`prose prose-sm max-w-none dark:prose-invert ${note.addedToDiary ? 'line-through' : ''}`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.text}</ReactMarkdown>
          <p className="text-xs text-[#867d6a] dark:text-gray-500 mt-1 not-prose">{new Date(note.date).toLocaleString()}</p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-2 items-center ml-2">
        {isEditing ? (
          <button onClick={handleSave}>
            <Save size={20} className="text-blue-500 hover:text-blue-700 transition" />
          </button>
        ) : (
          <>
            <button onClick={() => onToggle(note.id)}>
              <CheckCircle2
                size={20}
                className={`${note.addedToDiary ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'} hover:text-green-600 dark:hover:text-green-500 transition`}
              />
            </button>
            <button onClick={() => setIsEditing(true)}>
              <Edit size={18} className="text-gray-500 hover:text-blue-500 transition" />
            </button>
            <button onClick={() => onDelete(note.id)}>
              <Trash2
                size={18}
                className="text-red-400 hover:text-red-600 transition"
              />
            </button>
          </>
        )}
      </div>
    </motion.li>
  );
}
