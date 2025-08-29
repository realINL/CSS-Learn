import { useRef, useState, useEffect } from 'react';
import './FontFamilyPage.css';
import CodeEditor from '../../CodeEditor';
import BrowserSupport from '../../BrowserSupport';

const FontFamilyPage = () => {
  const [cssCode, setCssCode] = useState<string>('font-family: Arial, sans-serif;');
  const [error, setError] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const demoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (taskStatus !== 'idle') setTaskStatus('idle');
  }, [cssCode]);

  const applyCss = () => {
    setError('');
    try {
      if (demoRef.current) {
        demoRef.current.style.cssText = cssCode;
      }
    } catch (e) {
      setError('Неверный CSS. Проверьте синтаксис.');
    }
  };

  const resetCss = () => {
    const defaultCss = 'font-family: Arial, sans-serif;';
    setCssCode(defaultCss);
    if (demoRef.current) {
      demoRef.current.style.cssText = defaultCss;
    }
    setError('');
    setTaskStatus('idle');
    setShowSolution(false);
  };

  const checkTask = () => {
    if (!demoRef.current) return;
    const computed = window.getComputedStyle(demoRef.current);
    const fontFamily = computed.fontFamily.toLowerCase();
    if (fontFamily.includes('georgia')) {
      setTaskStatus('success');
    } else {
      setTaskStatus('error');
    }
  };

  const revealSolution = () => {
    const solution = 'font-family: Georgia, serif;';
    setCssCode(solution);
    setShowSolution(true);
    if (demoRef.current) {
      demoRef.current.style.cssText = solution;
    }
  };

  return (
    <div className="font-family-page-container">
      <header className="font-family-page-header">
        <h1 className="font-family-title">CSS Font-family</h1>
        <p>Свойство для выбора шрифта текста</p>
      </header>
      
      <main className="font-family-content">
        <section className="font-family-section">
          <h2>Синтаксис</h2>
          <div className="code-block">
            <code>font-family: "Имя шрифта", Запасной, generic-family;</code>
          </div>
        </section>

        <section className="font-family-section">
          <h2>Описание</h2>
          <p>
            <strong>font-family</strong> управляет тем, каким шрифтом будет отображаться текст.
            Обычно перечисляют несколько вариантов: сначала желаемый, затем запасные,
            и в конце указывают общую группу — <code>serif</code>, <code>sans-serif</code> или <code>monospace</code>.
          </p>
          <p>
            Это гарантирует, что текст всегда будет читабельным, даже если основной шрифт недоступен.
          </p>
        </section>

        <section className="font-family-section">
          <h2>Примеры</h2>
          <div className="example-block">
            <h3>Разные шрифты</h3>
            <div className="font-family-examples">
              <div className="font-family-example georgia">font-family: Georgia, serif;</div>
              <div className="font-family-example arial">font-family: Arial, sans-serif;</div>
              <div className="font-family-example courier">font-family: "Courier New", monospace;</div>
              <div className="font-family-example times">font-family: "Times New Roman", Times, serif;</div>
            </div>
          </div>
        </section>

        <section className="font-family-section">
          <h2>Интерактивный пример</h2>
          <div className="interactive-demo">
            <CodeEditor
              value={cssCode}
              onChange={setCssCode}
              onApply={applyCss}
              onReset={resetCss}
              error={error}
              placeholder={'font-family: Georgia, serif;'}
              title={'CSS редактор'}
            />
            <div className="demo-text" ref={demoRef}>
              Этот текст изменит свой шрифт в соответствии с вашим CSS.
            </div>
          </div>
        </section>

        <section className="font-family-section task-card">
          <h2>Задание</h2>
          <p>Задай для текста шрифт <code>Georgia</code> с запасным вариантом <code>serif</code>.</p>
          <div className="task-actions">
            <button className="btn primary" onClick={checkTask}>Проверить</button>
            <button className="btn secondary" onClick={revealSolution}>Показать ответ</button>
          </div>
          {taskStatus === 'success' && (
            <div className="task-status success">Отлично! Шрифт применён.</div>
          )}
          {taskStatus === 'error' && (
            <div className="task-status error">Пока неверно. Попробуй так: font-family: Georgia, serif;</div>
          )}
          {showSolution && (
            <div className="code-block solution-block"><code>font-family: Georgia, serif;</code></div>
          )}
        </section>

        <BrowserSupport 
          support={{
            chrome: "Полная поддержка",
            firefox: "Полная поддержка", 
            safari: "Полная поддержка",
            edge: "Полная поддержка",
            ie: "Полная поддержка"
          }}
        />
      </main>
    </div>
  );
};

export default FontFamilyPage;
