import {lazy, Suspense, useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './pages/header';
import Load from './components/load/load';
import { useAxios } from '../src/service/useAxios'
function App() {

const [isAuth,setIsAuth]=useState(false)


const CadastraPaciente =lazy(()=>import('./pages/cadastraPaciente'))
const ListaPacientes =lazy(()=>import('./pages/listaPacientes'))
const PacientePage=lazy(()=>import('./pages/Paciente'))
const CadastraAvCompCorp = lazy(()=>import('./pages/cadastraCompCorp'))
const AvCompCorp =lazy(()=>import('./pages/compcorp'))
const CadastraAvAntropometrica=lazy(()=>import('./pages/cadastraAntropometrica'))
const AvAntropometrica =lazy(()=>import('./pages/antropometrica'))
const Login =lazy(()=>import('./pages/auth/login'))
const Register =lazy(()=>import('./pages/auth/registro'))

if(!isAuth){ 
  return ( <Router>   
    <Suspense fallback={<Load/>}>
    <Routes>
      <Route path="/" element={<Login setIsAuth={setIsAuth}/>}/>
      <Route path="*" element={<Login setIsAuth={setIsAuth}/>}/>
      <Route path="/registro" element={<Register setIsAuth={setIsAuth}/>}/>
    
    </Routes>
    </Suspense>
  </Router>);
 }
  else{
    return (
      <Router>  
            
        <Suspense fallback={<Load/>}>
        <Header setIsAuth={setIsAuth}/>
        <Routes>
          <Route path="/" element={<CadastraPaciente/>}/>
          <Route path="/cadastro" element={<CadastraPaciente/>}/>
          <Route path="/pacientes" element={<ListaPacientes/>}/>
          <Route path="/pacientes/:id" element={<PacientePage/>}/>
          <Route path="/cadastrocompcorp/:id" element={<CadastraAvCompCorp/>}/>
          <Route path="/compcorp/:id/:index" element={<AvCompCorp/>}/>
          <Route path="/cadastroantropometrica/:id" element={<CadastraAvAntropometrica/>}/>
          <Route path="/antropometrica/:id/:index" element={<AvAntropometrica/>}/>
        
        </Routes>
        </Suspense>
      </Router>
      
      );
  }
  
}

export default App;
