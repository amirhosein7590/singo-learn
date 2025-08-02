import { Editor as TinyEditor } from "@tinymce/tinymce-react";
import { useState } from "react";

function Editor({getFaqs}) {
  const handelEditorContent = (content) => {
    getFaqs(convertHTMLToStructuredArray(content))
  };

  const convertHTMLToStructuredArray = (html)=> {
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
          node.tagName === "H3"
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
  }

  return (
    <div className="editor mt-10">
      <TinyEditor
        apiKey="q266gz95jwq8i0ix4sn6p53yuookev3oejp4awebfqzjguez"
        onEditorChange={handelEditorContent}
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
