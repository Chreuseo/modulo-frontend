import { QuillModules } from 'ngx-quill';

export const quillModules: QuillModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'color': [] }, { 'background': [] }], // Dropdown with colors
    [{ 'header': [1, false] }],            // Dropdown with headers
    ['clean']  // Remove formatting button
  ]
};
