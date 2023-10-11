import'./NavBar.css'
import { Link } from "react-router-dom"
import CartWidget from "../CartWidget/CartWidget"


const Navbar = () => {
    return (
        <div className='div_navbar_container'>
                <Link className='h1_navbar' to={'/'}>Hyper Mega Red</Link>
            <div className='div_navbar'>
                <Link to={'/'}>Todo</Link>
                <Link to={'/category/monitores'}>Monitores</Link>
                <Link to={'/category/gabinetes'}>Gabinetes</Link>
                <Link to={'/category/perifericos'}>Perifericos</Link>
            </div>
            <CartWidget />
        </div>
    )
}

export default Navbar