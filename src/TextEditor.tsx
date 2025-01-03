import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = () => {
  const [editorText, setEditorText] = useState("");
  const editorRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const quill = editorRef.current.getEditor();
    const text = quill.getText();
    const wordRegex = /([a-zA-Z0-9]+([a-zA-Z0-9]+)*)/g;
    let match;

    let lastIndex = 0;
    while ((match = wordRegex.exec(text)) !== null) {
      const word = match[0];
      const start = match.index;
      const end = start + word.length;
      if (word.length > 10) {
        quill.formatText(start, end, "underline", true);
        quill.formatText(start, end, "color", "red");
      } else {
        quill.formatText(start, end, "underline", false);
        quill.formatText(start, end, "color", "black");
      }

      lastIndex = end;
    }

    const remainingText = text.slice(lastIndex);
    if (remainingText) {
      quill.formatText(
        lastIndex,
        lastIndex + remainingText.length,
        "underline",
        false
      );
      quill.formatText(
        lastIndex,
        lastIndex + remainingText.length,
        "color",
        "black"
      );
    }
  }, [editorText]);

  const handleChange = (value: string) => {
    setEditorText(value);
  };

  return (
    <div>
      <h1>Text Editor</h1>
      <ReactQuill
        ref={editorRef}
        value={editorText}
        style={{ height: "300px", width: "500px" }}
        onChange={handleChange}
        theme="snow"
        placeholder="Type here..."
        modules={{
          toolbar: false,
        }}
      />
    </div>
  );
};

export default TextEditor;
