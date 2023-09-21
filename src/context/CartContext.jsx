import { useState, createContext, useContext } from 'react'
import { useNotification } from '../notification/NotificationService'

const CartContext = createContext({
    cart: []
})

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const { setNotification } = useNotification()


    const addItem = (productToAdd) => {
        if(!isInCart(productToAdd.id)) {
        setCart(prev => {
            productToAdd.stock= productToAdd.stock-productToAdd.quantity;
            setNotification('success', `Agregó ${productToAdd.quantity} ${productToAdd.name} al carrito`, 4)
            return [...prev, productToAdd]
        })
        } else {
            setCart(prev => {
                const posicion = averiguarPosicionSiYaExisteId (prev, productToAdd)
                if (productToAdd.quantity<=prev[posicion].stock) {
                    prev[posicion].quantity = prev[posicion].quantity + productToAdd.quantity
                    prev[posicion].stock = prev[posicion].stock - productToAdd.quantity
                    setNotification('success', `Agregó ${productToAdd.quantity} ${productToAdd.name} al carrito`, 3)
                    return [...prev]
                } else {
                    setNotification('error', `Error, ya agregó al carrito el stock completo de este producto`, 3)
                    return [...prev]
                }
            })
        }
    }

    const averiguarPosicionSiYaExisteId = (loPrevio,idParaChequear) => {
        const position = loPrevio.findIndex(objeto => objeto.id === idParaChequear.id);
        return position;
    }

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }

    const eliminarTarjeta = (idParaEliminar) => {
        setCart(prev => {
          const newCart = prev.filter((item) => item.id !== idParaEliminar)
          if (newCart.length !== prev.length) {
            setNotification('success', 'Se ha eliminado el producto del carrito', 3)
          } else {
            setNotification('error', 'No se encontró el producto en el carrito', 3)
          }
          return newCart
        })
      }

    const getTotalQuantity = () => {
        let totalQuantity = 0

        cart.forEach(prod => {
            totalQuantity += prod.quantity
        })

        return totalQuantity
    }

    const totalQuantity = getTotalQuantity()

    const getTotal = () => {
        let total = 0

        cart.forEach(prod => {
            total += prod.quantity * prod.price
        })

        return total
    }

    const total = getTotal()

    const clearCart = () => setCart([])

    return (
        <CartContext.Provider value={{ cart, addItem, totalQuantity, total, clearCart, eliminarTarjeta }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}