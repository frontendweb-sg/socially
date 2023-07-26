"use client";
import Editor, { type EditorProps } from "@monaco-editor/react";
import Box from "./Box";
import Select from "./Select";
import Button from "./Button";
import Upload from "./Uploader/Upload";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

type Props = EditorProps & {
  name: string;
};

const LANGUAGES = [
  { id: 1, label: "html" },
  { id: 2, label: "css" },
  { id: 3, label: "javascript" },
  { id: 4, label: "scss" },
  { id: 5, label: "typescript" },
  { id: 6, label: "json" },
];

const ext = {
  html: ".html",
  css: ".css",
  javascript: ".js,.jsx",
  typescript: ".tsx,.ts",
  json: ".json",
  scss: ".scss",
};

const CodeEditor = ({
  height = "50vh",
  defaultLanguage = "css",
  value,
  name,
  onChange,
  ...rest
}: Props) => {
  const [content, setContent] = useState<string>(value!);
  const [language, setLanguage] = useState(defaultLanguage);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // change theme
  const changeTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));

  // change language
  const changeLanguage = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setContent("");
    setLanguage(ev.target.value);
  };

  const loadFile = (name: string, files: File[]) => {
    const reader = new FileReader();
    reader.onload = () => setContent(reader.result as string);
    reader.readAsText(files[0]);
  };

  const changeHandler = (value: any) => {};

  return (
    <Box>
      <Box className="d-flex mb-3 align-items-center justify-content-between">
        <Select
          options={LANGUAGES}
          value={language}
          onChange={changeLanguage}
          className="w-25"
        />
        <Box className="d-flex align-items-center">
          <Upload
            setValues={loadFile}
            name="code"
            accept={ext[language as keyof typeof ext]}
          />
          <Button className="ms-2" onClick={changeTheme}>
            <FaEye />
          </Button>
        </Box>
      </Box>
      <Editor
        theme={`vs-${theme}`}
        language={language}
        height={height}
        value={content}
        onChange={changeHandler}
        {...rest}
      />
    </Box>
  );
};

export default CodeEditor;
