import Img from '../img/img'
import './load.css'
import Logo from '../../assets/img/logo192.png'
const Load =()=>{

    return <div className={"flex justify-center"}>
            <Img img={Logo}/>
            <div className="loader">
            
                <div className="loading"></div>
                <div className="loading"></div>
                <div className="loading"></div>
                <div className="loading"></div>
                <div className="loading"></div>
            </div>
        </div>
}


export default Load