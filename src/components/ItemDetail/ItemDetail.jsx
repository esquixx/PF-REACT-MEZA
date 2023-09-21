import { useState } from "react"
import ItemCount from "../ItemCount/ItemCount"
import { Link } from "react-router-dom"
import './ItemDetail.css'
import { useCart } from "../../context/CartContext"
import { useNotification } from "../../notification/NotificationService"

const ItemDetail = ({ id, name, img, price, category, descripcion, stock }) => {
    const [quantity, setQuantity] = useState(0)

    const { addItem } = useCart()
    const { setNotification } = useNotification()

    const handleOnAdd = (quantity) => {

        setQuantity(quantity)

        const objProduct = {
            id, name, price, quantity, descripcion, stock
        }

        addItem(objProduct)
        
    }

    return (
        <div className="div_itemdetail">
            <h2>{name}</h2>
            <img className="img_itemdetail" src={img} alt={name} />
            <p>Categoria: {category}</p>
            <p>Stock: {stock}</p>
            <p>${price}</p>
            <p>{descripcion}</p>
            {
                quantity == 0 
                    ? ( stock > 0
                        ? <ItemCount stock={stock} onAdd={handleOnAdd}/> 
                        : <p>No hay stock del producto</p>)
                    : <div className="div_botones_itemdetail">
                            <Link className="button_itemdetail" to='/cart'>finalizar compra</Link>
                            <Link className="button_itemdetail" to='/'>Seguir comprando</Link>
                    </div>
            }
        </div>
    )
}

export default ItemDetail