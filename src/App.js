import './App.css';
import Questions from './components/Questions';
import Quizlist from './components/Quizlist';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
        <Typography variant="h6">
            Quizzes
          </Typography>
        </Toolbar>

      </AppBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Quizlist />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
