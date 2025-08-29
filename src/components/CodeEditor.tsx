import React from 'react';

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
  error?: string;
  placeholder?: string;
  title?: string;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  onApply,
  onReset,
  error,
  placeholder,
  title = 'CSS редактор',
}) => {
  return (
    <div className="editor">
      <div className="editor-header">
        <span>{title}</span>
        <div className="editor-actions">
          <button className="btn primary" onClick={onApply}>Применить</button>
          <button className="btn secondary" onClick={onReset}>Сбросить</button>
        </div>
      </div>
      <textarea
        className="editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <div className="editor-error">{error}</div>}
    </div>
  );
};

export default CodeEditor;
