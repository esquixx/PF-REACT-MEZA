import cart from './assets/cart.svg'
import { useCart } from '../../context/CartContext'
import './CartWidget.css'
import { Link } from "react-router-dom"


const CartWidget = () => {
    const { totalQuantity } = useCart()

    return (
        <div className='div_img_carrito'>
            <Link className='contador_cartwidget' to={'/cart'}>
                <img className='img_carrito' src={cart} alt='cart-widget'/>
                {totalQuantity}
            </Link>
        </div>
    )
}

export default CartWidget