"use client";
import Editor, { type EditorProps, type Monaco } from "@monaco-editor/react";
import Box from "./Box";
import Select from "./Select";
import Button from "./Button";
import Upload from "./Uploader/Upload";
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FaEye } from "react-icons/fa";
import { type editor } from "monaco-editor";
import { Extensions, Languages } from "@/utils/content";

type Props = EditorProps & {
  name?: string;
  setFieldValue?: (name: string, data: string, event?: any) => void;
  readonly?: boolean;
};

type editorRefs = {
  monacoRef: React.Ref<Monaco>;
  editorRef: React.Ref<editor.IStandaloneCodeEditor>;
};

const CodeEditor = forwardRef<editorRefs, Props>(
  (
    {
      height = "50vh",
      defaultLanguage = "css",
      value,
      name,
      readonly = false,
      setFieldValue,
      ...rest
    },
    ref
  ) => {
    const [content, setContent] = useState<string>(value!);
    const [editorEvent, setEditorEvent] =
      useState<editor.IModelContentChangedEvent | null>(null);
    const [language, setLanguage] = useState(defaultLanguage);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const monacoRef = useRef<Monaco | null>(null);
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    useImperativeHandle(ref, () => ({ editorRef, monacoRef }));

    function handleEditorDidMount(
      editor: editor.IStandaloneCodeEditor,
      monaco: Monaco
    ) {
      editorRef.current = editor;
    }
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

    const changeHandler = (
      value: string | undefined,
      ev: editor.IModelContentChangedEvent
    ) => {
      setContent(value!);
      setEditorEvent(ev);
    };

    useEffect(() => {
      setFieldValue?.(name!, content, editorEvent);
    }, [content, name, editorEvent, setFieldValue]);

    return (
      <Box>
        <Box className="d-flex mb-3 align-items-center justify-content-between">
          {!readonly && (
            <Select
              options={Languages}
              value={language}
              onChange={changeLanguage}
              className="w-25"
            />
          )}
          <Box className="d-flex align-items-center">
            {!readonly && (
              <Upload
                setValues={loadFile}
                name="code"
                accept={Extensions[language as keyof typeof Extensions]}
              />
            )}
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
          onMount={handleEditorDidMount}
          options={{
            readOnly: readonly,
          }}
          {...rest}
        />
      </Box>
    );
  }
);

export default memo(CodeEditor) as typeof CodeEditor;
