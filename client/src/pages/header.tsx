import Nav from "../components/Nav"
import { Link } from 'react-router-dom';
import Button from "../components/Button";



const Header = ({ setIsAuth, user }: any) => {

    const anchor = [<Link to='/cadastro'>{"Cadastar Paciente"}</Link>, <Link to='/pacientes'>{"Pacientes"}</Link>]
    const anchor2 = [<Button className={"mt-6 md:mt-1"} title={"Logout"} onClick={() => setIsAuth(false)} />,<div className={" self-center"}>{user}</div>]

    return <Nav anchor={anchor} anchor2={anchor2} />
}

export default Header