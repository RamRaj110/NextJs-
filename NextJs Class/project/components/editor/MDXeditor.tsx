"use client";

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  tablePlugin,
  imagePlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertCodeBlock,
  ListsToggle
} from "@mdxeditor/editor";
import "./darkEditor.css";
import "@mdxeditor/editor/style.css";
import { useTheme } from "next-themes";
import React from "react";
// 1. Import the dark theme
import { basicDark } from 'cm6-theme-basic-dark'; 

// --- Types ---
interface EditorProps {
  value: string;
  fieldChange: (value: string) => void;
  editorRef?: React.MutableRefObject<any>;
}

const Editor = ({ value, fieldChange, editorRef }: EditorProps) => {
  const { resolvedTheme } = useTheme();

  // 2. Conditionally load the dark theme extension for CodeMirror
  const themeExtensions = resolvedTheme === 'dark' ? [basicDark] : [];

  return (
    <MDXEditor
      ref={editorRef}
      markdown={value}
      onChange={fieldChange}
      // 3. Add 'prose' classes for Typography support
      // 'prose-headings:text-foreground' ensures headings aren't gray in dark mode
    //  className={`markdown-editor grid w-full gap-5 ${resolvedTheme === 'dark' ? 'dark-theme' : ''}`}
     className={`markdown-editor grid w-full gap-5 ${resolvedTheme === 'dark' ? 'dark-theme' : ''}`}
      contentEditableClassName="prose dark:prose-invert max-w-none min-h-[300px]"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        
        // 4. Configure CodeMirror with the theme extension
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        codeMirrorPlugin({ 
            codeBlockLanguages: { 
                js: 'JavaScript', 
                ts: 'TypeScript',
                css: 'CSS', 
                html: 'HTML', 
                python: 'Python',
                json: 'JSON',
                sql: 'SQL'
            },
            // Pass the conditional theme extensions here
            codeMirrorExtensions: themeExtensions 
        }),

        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <div className="mx-2 h-6 w-[1px] bg-border" /> 
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <div className="mx-2 h-6 w-[1px] bg-border" />
              <ListsToggle />
              <BlockTypeSelect />
              <div className="mx-2 h-6 w-[1px] bg-border" />
              <CreateLink />
              <InsertImage />
              <InsertTable />
              <InsertCodeBlock />
            </>
          ),
        }),
      ]}
    />
  );
};

export default Editor;