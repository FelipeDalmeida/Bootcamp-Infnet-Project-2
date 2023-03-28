import {lazy, Suspense, useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './pages/Header';
import Load from './components/load/Load';
import { useAxios } from '../src/service/useAxios'
function App() {

const [isAuth,setIsAuth]=useState(true) //TODO: Mudar valor para false após desenvolvimento - Mock


const CadastraPaciente =lazy(()=>import('./pages/CadastraPaciente'))
const ListaPacientes =lazy(()=>import('./pages/ListaPacientes'))
const PacientePage=lazy(()=>import('./pages/Paciente'))
const CadastraAvCompCorp = lazy(()=>import('./pages/CadastraCompCorp'))
const AvCompCorp =lazy(()=>import('./pages/CompCorp'))
const CadastraAvAntropometrica=lazy(()=>import('./pages/CadastraAntropometrica'))
const AvAntropometrica =lazy(()=>import('./pages/Antropometrica'))
const Login =lazy(()=>import('./pages/auth/Login'))
const Register =lazy(()=>import('./pages/auth/Registro'))

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
