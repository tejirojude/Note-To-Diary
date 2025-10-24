import React from 'react';

export default function NoteControls({ filter, setFilter, sort, setSort }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4 sm:gap-0">
      <h2 className="text-base sm:text-lg font-medium text-[#3e3a32] dark:text-gray-200 text-center sm:text-left">Your Notes</h2>
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <div className="flex items-center">
          <label htmlFor="filter" className="text-sm mr-1 sm:mr-2 text-[#3e3a32] dark:text-gray-400">Filter:</label>
          <select id="filter" value={filter} onChange={e => setFilter(e.target.value)} className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm p-1">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="sort" className="text-sm mr-1 sm:mr-2 text-[#3e3a32] dark:text-gray-400">Sort:</label>
          <select id="sort" value={sort} onChange={e => setSort(e.target.value)} className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm p-1">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
}
