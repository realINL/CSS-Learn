import { useRef, useState, useEffect } from 'react';
import './FontSizePage.css';
import CodeEditor from '../../CodeEditor';
import BrowserSupport from '../../BrowserSupport';

const FontSizePage = () => {
  const [cssCode, setCssCode] = useState<string>('font-size: 16px;');
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
    const defaultCss = 'font-size: 16px;';
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
    const fontSize = computed.fontSize;

    const sizeInPx = parseFloat(fontSize);
    if (sizeInPx >= 24) {
      setTaskStatus('success');
    } else {
      setTaskStatus('error');
    }
  };

  const revealSolution = () => {
    const solution = 'font-size: 24px;';
    setCssCode(solution);
    setShowSolution(true);
    if (demoRef.current) {
      demoRef.current.style.cssText = solution;
    }
  };

  return (
    <div className="font-size-page-container">
      <header className="font-size-page-header">
        <h1 className="font-size-title">CSS Font-size</h1>
        <p>Свойство для изменения размера шрифта текста</p>
      </header>
      
      <main className="font-size-content">
        <section className="font-size-section">
          <h2>Синтаксис</h2>
          <div className="code-block">
            <code>font-size: значение;</code>
          </div>
        </section>

        <section className="font-size-section">
          <h2>Описание</h2>
          <p>
            <strong>font-size</strong> — это «регулятор громкости» для вашего текста. 
            С его помощью можно сделать текст больше или меньше, выделить заголовки, 
            создать иерархию информации. Работает с абсолютными единицами 
            (<code>px</code>, <code>pt</code>), относительными (<code>em</code>, <code>rem</code>) 
            и ключевыми словами (<code>small</code>, <code>large</code>).
          </p>
          <p>
            <code>rem</code> — современный стандарт, который берёт за основу размер 
            шрифта корневого элемента. <code>em</code> наследует от родителя. 
            <code>px</code> — фиксированный размер, не зависит от настроек пользователя. 
            Для доступности лучше использовать относительные единицы.
          </p>
        </section>

        <section className="font-size-section">
          <h2>Примеры</h2>
          
          <div className="example-block">
            <h3>Абсолютные размеры</h3>
            <div className="font-size-examples">
              <div className="font-size-example size-12">font-size: 12px;</div>
              <div className="font-size-example size-16">font-size: 16px;</div>
              <div className="font-size-example size-20">font-size: 20px;</div>
              <div className="font-size-example size-24">font-size: 24px;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>Относительные размеры</h3>
            <div className="font-size-examples">
              <div className="font-size-example size-small">font-size: small;</div>
              <div className="font-size-example size-medium">font-size: medium;</div>
              <div className="font-size-example size-large">font-size: large;</div>
              <div className="font-size-example size-xlarge">font-size: x-large;</div>
            </div>
          </div>

          <div className="example-block">
            <h3>Проценты и em</h3>
            <div className="font-size-examples">
              <div className="font-size-example size-80">font-size: 80%;</div>
              <div className="font-size-example size-120">font-size: 120%;</div>
              <div className="font-size-example size-1-5em">font-size: 1.5em;</div>
              <div className="font-size-example size-2em">font-size: 2em;</div>
            </div>
          </div>
        </section>

        <section className="font-size-section">
          <h2>Интерактивный пример</h2>
          <div className="interactive-demo">
            <CodeEditor
              value={cssCode}
              onChange={setCssCode}
              onApply={applyCss}
              onReset={resetCss}
              error={error}
              placeholder={'font-size: 16px;'}
              title={'CSS редактор'}
            />
            <div className="demo-text" ref={demoRef}>
              Этот текст изменит свой размер в соответствии с вашим CSS.
            </div>
          </div>
        </section>

        <section className="font-size-section task-card">
          <h2>Задание</h2>
          <p>Сделай размер шрифта больше 20px с помощью font-size.</p>
          <div className="task-actions">
            <button className="btn primary" onClick={checkTask}>Проверить</button>
            <button className="btn secondary" onClick={revealSolution}>Показать ответ</button>
          </div>
          {taskStatus === 'success' && (
            <div className="task-status success">Верно! Размер шрифта увеличен.</div>
          )}
          {taskStatus === 'error' && (
            <div className="task-status error">Пока неверно. Попробуй увеличить размер: font-size: 24px;</div>
          )}
          {showSolution && (
            <div className="code-block solution-block"><code>font-size: 24px;</code></div>
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

export default FontSizePage;
