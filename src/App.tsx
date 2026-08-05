import { createHashRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "@/state/cart";
import { OrderProvider } from "@/state/order";
import { SessionProvider } from "@/state/session";
import { DeliveryProvider } from "@/state/delivery";
import { DebtsProvider } from "@/state/debts";
import { DeviceFrame } from "@/components/DeviceFrame";
import { Home } from "@/screens/Home";
import { Catalog } from "@/screens/Catalog";
import { ProductDetail } from "@/screens/ProductDetail";
import { Cart } from "@/screens/Cart";
import { Reservation } from "@/screens/Reservation";
import { PaymentQR } from "@/screens/PaymentQR";
import { OrderStatus } from "@/screens/OrderStatus";
import { OrderHistory } from "@/screens/OrderHistory";
import { Profile } from "@/screens/Profile";
import { Login } from "@/screens/Login";
import { Search } from "@/screens/Search";
import { Categories } from "@/screens/Categories";
import { WhatsApp } from "@/screens/WhatsApp";
import { Debts } from "@/screens/Debts";
import { DebtDetail } from "@/screens/DebtDetail";
import { DebtPayment } from "@/screens/DebtPayment";

const router = createHashRouter([
  {
    element: <DeviceFrame />,
    children: [
      { path: "/", element: <WhatsApp /> },
      { path: "/login", element: <Login /> },
      { path: "/inicio", element: <Home /> },
      { path: "/catalogo", element: <Catalog /> },
      { path: "/categorias", element: <Categories /> },
      { path: "/buscar", element: <Search /> },
      { path: "/producto/:id", element: <ProductDetail /> },
      { path: "/carrito", element: <Cart /> },
      { path: "/reserva", element: <Reservation /> },
      { path: "/pago", element: <PaymentQR /> },
      { path: "/pedidos", element: <OrderHistory /> },
      { path: "/pedido/:num", element: <OrderStatus /> },
      { path: "/perfil", element: <Profile /> },
      // Módulo de pago de deudas: dominio separado del catálogo/carrito,
      // solo accesible vía handoff del bot. Sin navegación cruzada.
      { path: "/deudas", element: <Debts /> },
      { path: "/deuda/:id", element: <DebtDetail /> },
      { path: "/deuda/:id/pago", element: <DebtPayment /> },
    ],
  },
]);

export default function App() {
  return (
    <SessionProvider>
      <CartProvider>
        <DeliveryProvider>
          <OrderProvider>
            <DebtsProvider>
              <RouterProvider router={router} />
            </DebtsProvider>
          </OrderProvider>
        </DeliveryProvider>
      </CartProvider>
    </SessionProvider>
  );
}
