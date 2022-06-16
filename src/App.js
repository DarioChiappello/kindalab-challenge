import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CocktailList from './components/CocktailList';
import CocktailDetail from './components/CocktailDetail';
import Error from './components/Error';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CocktailList/>} />
          <Route path='/cocktail/:cocktailId' element={<CocktailDetail/>} />
          <Route path='*' element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
