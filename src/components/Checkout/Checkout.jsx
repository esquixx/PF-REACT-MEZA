import { collection, query, where, documentId, getDocs, writeBatch, addDoc } from "firebase/firestore"
import { useCart } from "../../context/CartContext"
import { db } from "../../services/firebase/firebaseConfig"
import { useNotification } from "../../notification/NotificationService"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Checkout.css'


const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const { cart, total, clearCart } = useCart();
  const { setNotification } = useNotification();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    localidad:'',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const objOrder = {
      buyer: {
        name: formData.name,
        localidad: formData.localidad,
        phone: formData.phone,
        email: formData.email,
      },
      items: cart,
      total,
    };

    try {
      const ids = cart.map(prod => prod.id)

      const productsRef = query(collection(db, 'products'), where(documentId(), 'in', ids))
      const { docs } = await getDocs(productsRef)

      const batch = writeBatch(db)
      const outOfStock = []

      docs.forEach(doc => {
        const fieldsDoc = doc.data()
        const stockDb = fieldsDoc.stock

        const productAddedToCart = cart.find(prod => prod.id === doc.id)
        const prodQuantity = productAddedToCart?.quantity

        if (stockDb >= prodQuantity) {
          batch.update(doc.ref, { stock: stockDb - prodQuantity })
        } else {
          outOfStock.push({ id: doc.id, ...fieldsDoc })
        }
      })

      if (outOfStock.length === 0) {
        batch.commit()

        const ordersRef = collection(db, 'orders')
        const { id } = await addDoc(ordersRef, objOrder)

        setNotification('success', 'La orden fue generada correctamente, el id es: ' + id)
        clearCart()
        navigate('/')
      } else {
        setNotification('error', 'hay productos que no tienen stock')
      }
    } catch (error) {
      setNotification('error', 'hubo un error en la generacion de la orden')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <h1>Se está generando su orden...</h1>;
  }

  return (
    <>
      <h1>FINALIZAR COMPRA</h1>
      <h2 className="h2_form">Complete el formulario, por favor</h2>
      <form className="form" onSubmit={createOrder}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Localidad:
          <input
            type="text"
            name="localidad"
            value={formData.localidad}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Teléfono:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <button className="button_compra"  type="submit">Generar orden de compra</button>
      </form>
    </>
  );
}

export default Checkout;