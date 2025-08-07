import "./HomePage.css"

function HomePage () {
    return (  
        <>
        <header className="home-page-header">
            <h1 className="css-learn-title">CSS Learn</h1>
            <h3>Интерактивный справочник с примерами кода и демонстрацией</h3>
            <div>
                <input className="text-field-input"
                type="text"
                placeholder="Найти свойство..."/>
                
            </div>
        </header>
       
        <main className="home-page">
            <img src="https://skillicons.dev/icons?i=css" alt="css logo" height={150}></img>
            <div>
                <h1 className="css-title">CSS</h1>
                <h4>Язык для стилизации веб-старниц</h4>
            </div>
            
        </main>

        <section className="section">
            <h3 className="home-page-h3">Изучай</h3>
            <h3 className="home-page-h3">Пробуй</h3>
        </section>
        </>
    );
}

export default HomePage ;