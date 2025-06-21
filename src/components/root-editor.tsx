'use client';

import type { SerializedEditorState } from 'lexical';
import { useEffect, useState } from 'react';
import { Editor } from './blocks/editor-00/editor';

type RootEditorProps = {
  label?: string;
  value: SerializedEditorState;
  onChangeAction: (value: SerializedEditorState) => void;
};

const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Hello World 🚀',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
} as unknown as SerializedEditorState;

export default function RootEditor({ label, value, onChangeAction }: RootEditorProps) {
  const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue);

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setEditorState(value);
  }, [value]);

  return (
    <div className="mb-4">
      {label && <label className="block mb-2 text-sm font-medium">{label}</label>}

      <Editor
        editorSerializedState={editorState}
        onSerializedChange={(updated) => {
          setEditorState(updated);
          onChangeAction(updated);
        }}
      />
    </div>
  );
}
