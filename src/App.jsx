import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { ROUTES } from './config/routes';
import CoursesPage from './pages/CoursesPage';
import Home from './pages/Home';
import InscriptionPage from './pages/InscriptionPage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectsPage from './pages/ProjectsPage';

/**
 * Composant racine : déclare le Router et la mise en page commune.
 * Header et Footer sont hors de <Routes> : ils s'affichent sur toutes les pages.
 */
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-layout">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.projects} element={<ProjectsPage />} />
            <Route path={ROUTES.courses} element={<CoursesPage />} />
            {/* Route dynamique : le segment :courseId est optionnel (?) */}
            <Route path={`${ROUTES.inscription}/:courseId?`} element={<InscriptionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
