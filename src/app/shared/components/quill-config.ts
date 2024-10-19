import { QuillModules } from 'ngx-quill';

export const quillModules: QuillModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'header': 1}],
    [{ 'script': 'super' }, { 'script': 'sub' }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'color': [] }, { 'background': [] }], // Dropdown with colors
    ['clean']  // Remove formatting button
  ]
};
