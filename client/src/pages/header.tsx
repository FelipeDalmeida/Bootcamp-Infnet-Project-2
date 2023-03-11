import Nav from "../components/nav/nav"
import {Link } from 'react-router-dom';
import Button from "../components/button/button";



const Header=({setIsAuth}:any)=>{

    const anchor=[<Link to='/cadastro'>{"Cadastar Paciente"}</Link>,<Link to='/pacientes'>{"Pacientes"}</Link>]
    //const anchor2=[<Link to='/login'>{"Login"}</Link>,<Link to='/registro'>{"Registro"}</Link>]
    const anchor2=[<Button className={"mt-6 md:mt-1"} title={"Logout"} onClick={()=>setIsAuth(false)}/>]

    return <Nav anchor={anchor} anchor2={anchor2}/>
}

export default Header