import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Books from "./pages/Books";
import { books } from "./data";
import BookInfo from "./pages/BookInfo";
// @ts-ignore
import LibraryLogo from "./assets/Library.svg";
import Cart from "./pages/Cart";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    // @ts-ignore
    setCart([...cart, { ...book, quantity: 1 }]);
    // const dupeItem = cart.find(item => +item.id === +book.id)
    // if (dupeItem) {
    //   setCart(cart.map(item => {
    //     if(item.id === dupeItem.id) {
    //       return {
    //         ...item,
    //         quantity: item.quantity + 1
    //       }
    //     }
    //     else {
    //       return item;
    //     }
    //   }))
    // } else {
    //   if(!cart[0].quantity){
    //     setCart([{...book, quantity: 1}])
    //   } else {
    //     setCart([...cart, {...book, quantity: 1}]);
    //   }
    // }
  }

  function changeQuantity(book, quantity) {
    // @ts-ignore
    setCart(
      // @ts-ignore
      cart.map((item) => 
        // @ts-ignore
        item.id === book.id
          ? // @ts-ignore
            { ...item, quantity: quantity }
          : item
      )
    );
  }

  function removeBook(id){
    setCart([...cart.filter((item) => item.id !== id)]);
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach(item => {
      counter += +item.quantity;
    })
    return counter;
  }

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <Router basename="/library-react">
      <div className='App'>
        <Nav logo={LibraryLogo} numberOfItems={numberOfItems()} />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/books'
            element={<Books books={books} />}
          />
          <Route
            path='/books/:id'
            element={
              <BookInfo
                books={books}
                addToCart={addToCart}
                cart={cart}
              />
            }
          />
          <Route
            path='/cart'
            element={
              <Cart
                cart={cart}
                changeQuantity={changeQuantity}
                removeItem = {removeBook}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
