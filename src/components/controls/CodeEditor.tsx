"use client";
import Editor, { type EditorProps } from "@monaco-editor/react";
import { useState } from "react";
import Box from "./Box";
import Select from "./Select";
import Button from "./Button";
import { FaEye } from "react-icons/fa";

type Props = EditorProps & {};

const LANGUAGES = [
  { id: 1, label: "html" },
  { id: 2, label: "css" },
  { id: 3, label: "javascript" },
  { id: 4, label: "scss" },
  { id: 5, label: "typescript" },
  { id: 6, label: "json" },
];
const CodeEditor = ({
  height = "50vh",
  defaultLanguage = "css",
  ...rest
}: Props) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(ev.target.value);
  };

  const changeTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  console.log(theme);
  return (
    <Box>
      <Box className="d-flex mb-3 align-items-center justify-content-between">
        <Select
          options={LANGUAGES}
          value={language}
          onChange={onChange}
          className="w-25"
        />
        <Button onClick={changeTheme}>
          <FaEye />
        </Button>
      </Box>
      <Editor
        theme={`vs-${theme}`}
        language={language}
        height={height}
        {...rest}
      />
    </Box>
  );
};

export default CodeEditor;
