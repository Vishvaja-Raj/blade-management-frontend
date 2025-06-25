// components/Loader.js
import React from 'react';

const Loader = () => (
  <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent" />
  </div>
);

export default Loader;
