import {lazy, Suspense, useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './pages/header';
import Load from './components/load/load';
import { useAxios } from '../src/service/useAxios'
function App() {

const [isAuth,setIsAuth]=useState(false)
const [user,setUser]=useState("")

const CadastraPaciente =lazy(()=>import('./pages/cadastraPaciente'))
const ListaPacientes =lazy(()=>import('./pages/listaPacientes'))
const PacientePage=lazy(()=>import('./pages/Paciente'))
const CadastraAvCompCorp = lazy(()=>import('./pages/cadastraCompCorp'))
const AvCompCorp =lazy(()=>import('./pages/compcorp'))
const CadastraAvAntropometrica=lazy(()=>import('./pages/cadastraAntropometrica'))
const AvAntropometrica =lazy(()=>import('./pages/antropometrica'))
const Login =lazy(()=>import('./pages/auth/login'))
const Register =lazy(()=>import('./pages/auth/registro'))
const Laudo =lazy(()=>import('./pages/Laudo'))

if(!isAuth){ 
  return ( <Router>   
    <Suspense fallback={<Load/>}>
    <Routes>
      <Route path="/" element={<Login setIsAuth={setIsAuth} setUser={setUser}/>}/>
      <Route path="*" element={<Login setIsAuth={setIsAuth} setUser={setUser}/>}/>
      <Route path="/registro" element={<Register setIsAuth={setIsAuth} setUser={setUser}/>}/>
    
    </Routes>
    </Suspense>
  </Router>);
 }
  else{
    return (
      <Router>  
            
        <Suspense fallback={<Load/>}>
        <Header setIsAuth={setIsAuth} user={user}/>
        <Routes>
          <Route path="/" element={<CadastraPaciente/>}/>
          <Route path="/cadastro" element={<CadastraPaciente/>}/>
          <Route path="/pacientes" element={<ListaPacientes/>}/>
          <Route path="/pacientes/:id" element={<PacientePage/>}/>
          <Route path="/cadastrocompcorp/:id" element={<CadastraAvCompCorp/>}/>
          <Route path="/compcorp/:id" element={<AvCompCorp/>}/>
          <Route path="/cadastroantropometrica/:id" element={<CadastraAvAntropometrica/>}/>
          <Route path="/antropometrica/:id" element={<AvAntropometrica/>}/>
          <Route path="/laudo/:id" element={<Laudo/>}/>
        
        </Routes>
        </Suspense>
      </Router>
      
      );
  }
  
}

export default App;
