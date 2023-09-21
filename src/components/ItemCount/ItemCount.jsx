import { useState } from "react"
import './ItemCount.css'

const ItemCount = ({ stock, onAdd }) => {
    const [count, setCount] = useState(1)
    
    const decrement = () => {
        if(count > 1) setCount(prev => prev - 1)
    }

    const increment = () => {
        if(count < stock) setCount(prev => prev + 1)
    }

    return (
        <div className="div_itemcount">
            <h3>{count}</h3>
            <div className="div_botones_itemcount">
                <button onClick={decrement}>-</button>
                <button onClick={() => onAdd(count)}>agregar al carrito </button>
                <button onClick={increment}>+</button>
            </div>
        </div>
    )
}

export default ItemCount