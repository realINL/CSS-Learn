import { useRef, useState, useEffect } from 'react';
import './TextAlignPage.css';
import CodeEditor from '../../CodeEditor';
import BrowserSupport from '../../BrowserSupport';

const TextAlignPage = () => {
  const [cssCode, setCssCode] = useState<string>('text-align: left;');
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
    const defaultCss = 'text-align: left;';
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
    const textAlign = computed.textAlign.trim().toLowerCase();

    if (textAlign === 'center') {
      setTaskStatus('success');
    } else {
      setTaskStatus('error');
    }
  };

  const revealSolution = () => {
    const solution = 'text-align: center;';
    setCssCode(solution);
    setShowSolution(true);
    if (demoRef.current) {
      demoRef.current.style.cssText = solution;
    }
  };

  return (
    <div className="text-align-page-container">
      <header className="text-align-page-header">
        <h1 className="text-align-title">CSS Text-align</h1>
        <p>Свойство для выравнивания текста по горизонтали</p>
      </header>
      
      <main className="text-align-content">
        <section className="text-align-section">
          <h2>Синтаксис</h2>
          <div className="code-block">
            <code>text-align: значение;</code>
          </div>
        </section>

        <section className="text-align-section">
          <h2>Описание</h2>
          <p>
            <strong>text-align</strong> — это «дирижёр» для вашего текста, который решает, 
            как он будет располагаться по горизонтали. Представьте, что у вас есть лист 
            бумаги с текстом — это свойство говорит, куда его «прижать»: к левому краю, 
            к правому, по центру или растянуть на всю ширину.
          </p>
          <p>
            <strong>left</strong> — классическое выравнивание по левому краю, как в книгах. 
            <strong>right</strong> — для особых случаев, например, для арабского текста или 
            подписей к фотографиям. <strong>center</strong> — для заголовков и важных 
            сообщений, чтобы привлечь внимание. <strong>justify</strong> — растягивает 
            текст по всей ширине, создавая ровные края с обеих сторон.
          </p>
          <p>
            <strong>Важно:</strong> Это свойство работает только с блочными элементами 
            и влияет на весь текст внутри них. Для выравнивания отдельных слов или 
            символов лучше использовать другие подходы, например, flexbox или grid.
          </p>
        </section>

        <section className="text-align-section">
          <h2>Примеры</h2>
          
          <div className="example-block">
            <h3>Базовые значения</h3>
            <div className="text-align-examples">
              <div className="text-align-example left">text-align: left;</div>
              <div className="text-align-example center">text-align: center;</div>
              <div className="text-align-example right">text-align: right;</div>
              <div className="text-align-example justify">text-align: justify;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>Сравнение выравниваний</h3>
            <div className="text-align-comparison">
              <div className="comparison-item">
                <span className="label">Left:</span>
                <div className="text left">Этот текст выровнен по левому краю. Это стандартное выравнивание для большинства текстов.</div>
              </div>
              <div className="comparison-item">
                <span className="label">Center:</span>
                <div className="text center">Этот текст выровнен по центру. Часто используется для заголовков.</div>
              </div>
              <div className="comparison-item">
                <span className="label">Right:</span>
                <div className="text right">Этот текст выровнен по правому краю. Подходит для подписей и дат.</div>
              </div>
              <div className="comparison-item">
                <span className="label">Justify:</span>
                <div className="text justify">Этот текст растянут по всей ширине. Создает ровные края с обеих сторон, как в газетах.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-align-section">
          <h2>Интерактивный пример</h2>
          <div className="interactive-demo">
            <CodeEditor
              value={cssCode}
              onChange={setCssCode}
              onApply={applyCss}
              onReset={resetCss}
              error={error}
              placeholder={'text-align: left;'}
              title={'CSS редактор'}
            />
            <div className="demo-text" ref={demoRef}>
              Этот текст изменит свое выравнивание в соответствии с вашим CSS. Попробуйте разные значения: left, center, right, justify.
            </div>
          </div>
        </section>

        <section className="text-align-section task-card">
          <h2>Задание</h2>
          <p>Выровняй текст по центру с помощью text-align.</p>
          <div className="task-actions">
            <button className="btn primary" onClick={checkTask}>Проверить</button>
            <button className="btn secondary" onClick={revealSolution}>Показать ответ</button>
          </div>
          {taskStatus === 'success' && (
            <div className="task-status success">Верно! Текст выровнен по центру.</div>
          )}
          {taskStatus === 'error' && (
            <div className="task-status error">Пока неверно. Попробуй выровнять по центру: text-align: center;</div>
          )}
          {showSolution && (
            <div className="code-block solution-block"><code>text-align: center;</code></div>
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

export default TextAlignPage;
