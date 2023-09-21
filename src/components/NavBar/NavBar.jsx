import'./NavBar.css'
import { Link } from "react-router-dom"
import CartWidget from "../CartWidget/CartWidget"


const Navbar = () => {
    return (
        <div className='div_navbar_container'>
                <Link className='h1_navbar' to={'/'}>Tienda de ropa deportiva</Link>
            <div className='div_navbar'>
                <Link to={'/'}>Todo</Link>
                <Link to={'/category/camisetas'}>Camisetas</Link>
                <Link to={'/category/shorts'}>Shorts</Link>
                <Link to={'/category/pantalones'}>Pantalones</Link>
                <Link to={'/category/botines'}>Botines</Link>
                <Link to={'/category/buzos'}>Buzos</Link>
            </div>
            <CartWidget />
        </div>
    )
}

export default Navbar