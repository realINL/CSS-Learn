import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import ColorPage from './components/ColorPage.tsx'
import BackgroundPage from './components/BackgroundPage'
import BackgroundImagePage from './components/BackgroundImagePage'
import BackgroundPositionPage from './components/BackgroundPositionPage'
import FontFamilyPage from './components/pages/Text/FontFamilyPage'
import FontSizePage from './components/pages/Text/FontSizePage'
import FontWeightPage from './components/pages/Text/FontWeightPage'
import TextAlignPage from './components/pages/Text/TextAlignPage'
import MarginPage from './components/pages/Positioning/MarginPage'
import PaddingPage from './components/pages/Positioning/PaddingPage'
import WidthPage from './components/pages/Positioning/WidthPage'
import HeightPage from './components/pages/Positioning/HeightPage'
import CatalogPage from './components/CatalogPage'
import Sidebar from './components/Sidebar'
import { PropertiesProvider } from './contexts/PropertiesContext'

function App() {
  return (
    <PropertiesProvider>
      <BrowserRouter>
        <div className="app">
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/color" element={<ColorPage />} />
            <Route path="/background" element={<BackgroundPage />} />
            <Route path="/background-image" element={<BackgroundImagePage />} />
            <Route path="/background-position" element={<BackgroundPositionPage />} />
            <Route path="/font-family" element={<FontFamilyPage />} />
            <Route path="/font-size" element={<FontSizePage />} />
            <Route path="/font-weight" element={<FontWeightPage />} />
            <Route path="/text-align" element={<TextAlignPage />} />
            <Route path="/margin" element={<MarginPage />} />
            <Route path="/padding" element={<PaddingPage />} />
            <Route path="/width" element={<WidthPage />} />
            <Route path="/height" element={<HeightPage />} />
            <Route path="/border" element={<div className="coming-soon">Border - скоро</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </PropertiesProvider>
  )
}

export default App
