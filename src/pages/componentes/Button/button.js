import { Link } from "react-router-dom";
import './styles.css'

export default function Button ({to,text}){
    return (

        <Link className="button" to={to}>{text}</Link>
    )
}