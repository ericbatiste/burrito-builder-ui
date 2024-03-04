import React from "react";
import OrderCard from "../OrderCard/OrderCard";
import "./Orders.css";

const Orders = ({orders}) => {

  const orderEls = orders.map((order) => {
    if (order) {
      return (
        <OrderCard 
        name={order.name}
        ingredients={order.ingredients}
        id={order.id}
        key={order.id}
        />
      );
    }
  });


  return (
    <section className="orders-container">
      {orders ? 
       orderEls.length ? orderEls : <p>No orders yet!</p> :
       <></> 
      }
    </section>
    
  );
};

export default Orders;
