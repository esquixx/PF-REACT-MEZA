import { Link } from "react-router-dom"
import Basura from '../CartWidget/assets/Basura.png'
import { useCart } from "../../context/CartContext"
import './Cart.css'

const  Cart = () => {
    const { cart, total, eliminarTarjeta } = useCart()


    return (
        <div>
            {cart.length === 0 ? (
                <h2 className="h2_carritovacio">El carrito está vacío</h2>
            ) : (
                <>
                    <h1 className="h1_cart">Finalizar compra?</h1>
                    {cart.map(prod => {
                        return (
                            <div className="div_cart" key={prod.id}>
                                <div className="div_trasher"> 
                                    <h1 className="h1_name">{prod.name}</h1> 
                                    <button className="button_img_trasher" onClick={() => eliminarTarjeta(prod.id)}>
                                        <img className="img_trasher" src={Basura} alt="trasher" />
                                    </button>
                                </div>
                                <h3>${prod.price}</h3>
                                <h3>cantidad: {prod.quantity}</h3>
                                <h3>subtotal: {prod.quantity * prod.price}</h3>
                            </div>
                        )
                    })}
                    <h1 className="h1_cart">Total de la compra: ${total}</h1>
                    <Link className="button_finalizaCompra" to='/checkout'>FINALIZAR COMPRA</Link>
                </>
            )}
        </div>
    );
}

export default Cart;