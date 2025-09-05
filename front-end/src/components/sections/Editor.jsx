/**
 * Editor Component
 * 
 * A wrapper around TinyMCE editor that allows rich text editing
 * and converts its HTML output into a structured array format
 * compatible with the backend.
 *
 * @component
 * @param {Object} props
 * @param {function(Array<Object>)} props.onChange - Callback function called when editor content changes. Receives an array of objects with 'title' and 'description'.
 * @param {string} props.initialValue - Initial HTML content to populate the editor.
 *
 * @description
 * Features:
 * - Uses TinyMCE as the text editor with RTL support for Persian content.
 * - Allows basic text formatting (bold, italic) and list creation (bullets, numbers).
 * - Converts headings (H1-H6) followed by paragraphs into structured objects:
 *   [
 *     { title: "Heading text", description: "Paragraph text" },
 *     ...
 *   ]
 * - Calls the provided onChange callback with the structured array whenever content changes.
 *
 * @notes
 * - Only considers paragraphs immediately following a heading for conversion.
 * - Subsequent paragraphs without a heading are ignored.
 * - DOMParser is used to parse the editor's HTML content.
 */


import { Editor as TinyEditor } from "@tinymce/tinymce-react";

function Editor({ onChange , initialValue }) {
  const handelEditorContent = (content) => {
    onChange(convertHTMLToStructuredArray(content));
  };

  const convertHTMLToStructuredArray = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const nodes = doc.body.childNodes;

    const result = [];
    let currentTitle = "";

    Array.from(nodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (
          node.tagName === "H1" ||
          node.tagName === "H2" ||
          node.tagName === "H3" ||
          node.tagName === "H4" ||
          node.tagName === "H5" ||
          node.tagName === "H6"
        ) {
          currentTitle = node.textContent.trim();
        } else if (node.tagName === "P" && currentTitle) {
          result.push({
            title: currentTitle,
            description: node.textContent.trim(),
          });
          currentTitle = "";
        }
      }
    });

    return result;
  };

  return (
    <div className="editor mt-10">
      <TinyEditor
        apiKey="q266gz95jwq8i0ix4sn6p53yuookev3oejp4awebfqzjguez"
        onEditorChange={handelEditorContent}
        initialValue={initialValue}
        init={{
          language: "fa",
          directionality: "rtl",
          plugins: "lists link",
          toolbar: "bold italic | rtl ltr | bullist numlist",
        }}
      />
    </div>
  );
}

export default Editor;
