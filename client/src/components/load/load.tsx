import Img from '../Img'
import styles from './load.module.css';
import Logo from '../../assets/img/logo192.png'
const Load = () => {

    return <div className={"flex justify-center"}>
        <Img img={Logo} />
        <div className={styles.loader}>

            <div className={styles.loading}></div>
            <div className={styles.loading}></div>
            <div className={styles.loading}></div>
            <div className={styles.loading}></div>
            <div className={styles.loading}></div>
        </div>
    </div>
}


export default Load