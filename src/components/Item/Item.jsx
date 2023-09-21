import { Link } from "react-router-dom"
import './Item.css'

const Item = ({ id, name, img, price }) => {
    return (
        <div className="div_item">
            <h2 className="h2_item">{name}</h2>
            <img className="img_item" src={img} alt={name} />
            <Link className="verdetalle_item" to={`/item/${id}`}>ver detalle</Link>
        </div>
    )
}

export default Item