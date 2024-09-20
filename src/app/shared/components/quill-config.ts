// src/quill-config.ts

import { QuillModules } from 'ngx-quill';

export const quillModules: QuillModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['clean'],  // Remove formatting button
    [{ 'color': [] }, { 'background': [] }], // Dropdown with colors
    [{ 'header': [1, 2, false] }]            // Dropdown with headers
  ]
};
