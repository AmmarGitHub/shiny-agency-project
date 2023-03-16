import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Survey from './pages/Survey';
import Header from './components/Header';
import Error from './components/Error';
import Freelances from './pages/Freelances';
import Results from './pages/Results';
import Footer from './components/Footer';
import { SurveyProvider, ThemeProvider } from './utils/context';
import GlobalStyle from './utils/style/GlobalStyle';
import Profile from './pages/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/survey/:questionNumber" element={<Survey />} />
            <Route path="/freelances" element={<Freelances />} />
            <Route
              path="/profile/:id"
              element={(props) => <Profile {...props} />}
            />

            <Route path="/results" element={<Results />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
