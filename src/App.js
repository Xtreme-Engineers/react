import './App.css';
import Questions from './components/Quizlist';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Questions from './components/Questions';

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

      <Questions />

    </div>
  );
}

export default App;
