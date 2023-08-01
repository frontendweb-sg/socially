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
import { AppContent, Extensions, Languages } from "@/utils/content";
import IconButton from "./IconButton";
import classNames from "classnames";

type Props = EditorProps & {
  name?: string;
  setFieldValue?: (name: string, data: string, event?: any) => void;
  readonly?: boolean;
  onClose?: () => void;
};

type editorRefs = {
  monacoRef: React.Ref<Monaco>;
  editorRef: React.Ref<editor.IStandaloneCodeEditor>;
};

const CodeEditor = forwardRef<editorRefs, Props>(
  (
    {
      height = "45vh",
      defaultLanguage = "css",
      value,
      name,
      readonly = false,
      setFieldValue,
      onClose,
      className,
      ...rest
    },
    ref
  ) => {
    const [content, setContent] = useState<{
      language: string;
      language_code: string;
    }>({
      language: "",
      language_code: value!,
    });
    const [editorEvent, setEditorEvent] =
      useState<editor.IModelContentChangedEvent | null>(null);
    const [language, setLanguage] = useState(defaultLanguage);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const monacoRef = useRef<Monaco | null>(null);
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    useImperativeHandle(ref, () => ({ editorRef, monacoRef }));

    const classes = classNames("code-editor", className);

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
      setContent({
        language: "",
        language_code: "",
      });
      setLanguage(ev.target.value);
    };

    const loadFile = (name: string, files: File[]) => {
      const reader = new FileReader();
      reader.onload = () =>
        setContent({ language, language_code: reader.result as string });
      reader.readAsText(files[0]);
    };

    const changeHandler = (
      value: string | undefined,
      ev: editor.IModelContentChangedEvent
    ) => {
      setContent({ language, language_code: value! });
      setEditorEvent(ev);
    };

    useEffect(() => {
      setFieldValue?.(name!, JSON.stringify(content), editorEvent);
    }, [content, name, editorEvent, setFieldValue]);

    return (
      <Box className={classes}>
        <Box
          className={classNames("code-editor-toolbar", readonly && "readonly")}
        >
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
            <IconButton
              icon={<FaEye />}
              className="ms-2"
              onClick={changeTheme}
            />
          </Box>
        </Box>
        <Editor
          theme={`vs-${theme}`}
          language={language}
          height={height}
          value={content.language_code}
          onChange={changeHandler}
          onMount={handleEditorDidMount}
          options={{
            readOnly: readonly,
          }}
          {...rest}
        />
        {/* {!readonly && (
          <>
            <hr />
            <Box className="d-flex justify-content-end">
              <Button onClick={onClose}>{AppContent.save}</Button>
            </Box>
          </>
        )} */}
      </Box>
    );
  }
);

export default memo(CodeEditor) as typeof CodeEditor;
