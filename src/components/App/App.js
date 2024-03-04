import { useEffect, useState } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([])

  function addOrder(order) {
    setOrders([...orders, order])
  }

  useEffect(() => {
    getOrders()
    .then(data => {
      setOrders(data.orders)
    })
    .catch((err) => console.error("Error fetching:", err));
  }, []);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder}/>
      </header>
      {orders.length && <Orders orders={orders} />}
    </main>
  );
}

export default App;
