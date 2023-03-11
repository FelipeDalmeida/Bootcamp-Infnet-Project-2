import PropTypes from 'prop-types';

interface ImgProps {
    img:string;
    className?:string;
    alt?:string;
  }


const Img =({img,className,alt}:ImgProps)=>{
    className=`${className} h-full`
    return <img src={img} className={className} alt={alt}/>
}

Img.propTypes={
    img:PropTypes.string,
    style:PropTypes.object,
    alt:PropTypes.string
}

Img.defaultProps={
    img:"",
    style:null,
    alt:""
}


export default Img