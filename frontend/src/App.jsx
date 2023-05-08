import { Outlet } from "react-router-dom";
import { Container } from "@/components/Container";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import second from "@/store/Product/ProductProvider";
import "@/App.css";
import ProductProvider from "./store/Product/ProductProvider";
import CartProvider from "./store/Cart/CartProvider";

function App() {
  console.log(import.meta.env);

  return (
    <ProductProvider>
      <CartProvider>
        <div className="flex justify-between flex-col h-screen relative">
          <Header />
          <main className="">
            <Container>
              <Outlet />
            </Container>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
