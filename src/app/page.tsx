"use client"

import { useState } from "react";
import { Modal, Box, Snackbar, Alert } from "@mui/material";

/* ================= TYPES ================= */
type MenuItem = {
  id: number;
  name: string;
  price: number;
};

type CartItem = MenuItem & {
  quantity: number;
};

/* ================= MENU DATA ================= */
const foodMenu: MenuItem[] = [
  { id: 1, name: "Classic Burger", price: 4500 },
  { id: 2, name: "Cheese Burger", price: 5000 },
  { id: 3, name: "Chicken Burger", price: 4800 },
  { id: 4, name: "Pepperoni Pizza", price: 6500 },
  { id: 5, name: "Margherita Pizza", price: 6000 },
  { id: 6, name: "BBQ Chicken Pizza", price: 7000 },
  { id: 7, name: "Grilled Chicken", price: 5500 },
  { id: 8, name: "Fried Chicken & Chips", price: 5200 },
  { id: 9, name: "Jollof Rice & Chicken", price: 4500 },
  { id: 10, name: "Fried Rice & Beef", price: 4700 },
  { id: 11, name: "Spaghetti Bolognese", price: 4800 },
  { id: 12, name: "Chicken Shawarma", price: 3500 },
];

const drinksMenu: MenuItem[] = [
  { id: 13, name: "Champagne", price: 10000 },
  { id: 14, name: "Pepsi", price: 1000 },
  { id: 15, name: "Fanta", price: 1000 },
  { id: 16, name: "Sprite", price: 1000 },
  { id: 17, name: "Bottled Water", price: 500 },
  { id: 18, name: "Fresh Orange Juice", price: 2000 },
  { id: 19, name: "Pineapple Juice", price: 2000 },
  { id: 20, name: "Apple Juice", price: 2000 },
  { id: 21, name: "Energy Drink", price: 2500 },
  { id: 22, name: "Iced Tea", price: 1800 },
];

const cocktailMenu: MenuItem[] = [
  { id: 23, name: "Mojito", price: 3500 },
  { id: 24, name: "Strawberry Mojito", price: 3800 },
  { id: 25, name: "Martini", price: 4000 },
  { id: 26, name: "Cosmopolitan", price: 4200 },
  { id: 27, name: "Margarita", price: 4500 },
  { id: 28, name: "Tequila Sunrise", price: 4300 },
  { id: 29, name: "Long Island Iced Tea", price: 5000 },
  { id: 30, name: "Piña Colada", price: 4700 },
  { id: 31, name: "Sex on the Beach", price: 4600 },
  { id: 32, name: "Whiskey Sour", price: 4800 },
];

/* ================= COMPONENT ================= */
export default function Home() {
  const [openMenu, setOpenMenu] = useState<
    "food" | "drinks" | "cocktail" | null
  >(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [openCart, setOpenCart] = useState(false);

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [seatNumber, setSeatNumber] = useState("");

  const [toastOpen, setToastOpen] = useState(false);

  /* ================= CART LOGIC ================= */
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const found = prev.find((c) => c.id === item.id);
      if (found) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.id === id ? { ...c, quantity: c.quantity - 1 } : c
        )
        .filter((c) => c.quantity > 0)
    );
  };

  /* ================= WHATSAPP ORDER ================= */
  const handleWhatsAppOrder = () => {
    const itemsText = cart
      .map(
        (item) =>
          `${item.name} x${item.quantity} - ₦${
            item.price * item.quantity
          }`
      )
      .join("\n");

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const message = `New Order 🍽️
Name: ${customerName}
Seat Number: ${seatNumber}

Order Items:
${itemsText}

Total: ₦${total}`;

    const phone = "2348021999995";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");

    setToastOpen(true);
    setCart([]);
    setCustomerName("");
    setSeatNumber("");
    setShowOrderForm(false);
    setOpenCart(false);
  };

  /* ================= MENU RENDER ================= */
  const renderMenu = (items: MenuItem[]) => (
    <div className="bg-gray-300 rounded-lg p-4 space-y-3">
      {items.map((item) => {
        const qty =
          cart.find((c) => c.id === item.id)?.quantity || 0;

        return (
          <div
            key={item.id}
            className="flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                ₦{item.price}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromCart(item.id)}
                className="border px-2 rounded"
              >
                −
              </button>
              <span>{qty}</span>
              <button
                onClick={() => addToCart(item)}
                className="border px-2 rounded"
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  /* ================= UI ================= */
  return (
    <>
      {/* SECTION */}
      <section
        className="relative min-h-screen bg-contain bg-center p-6"
        style={{
          backgroundImage:
            "url('/logos.jpeg')",
        }}
      >
        <button
          onClick={() => setOpenCart(true)}
          className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow flex items-center gap-2"
        >
          🛒
          <span className="font-semibold">
            {cart.reduce((a, b) => a + b.quantity, 0)}
          </span>
        </button>

        <div className="max-w-md mx-auto mt-24 space-y-4">
          <button
            onClick={() =>
              setOpenMenu(openMenu === "food" ? null : "food")
            }
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Food Menu
          </button>
          {openMenu === "food" && renderMenu(foodMenu)}

          <button
            onClick={() =>
              setOpenMenu(
                openMenu === "drinks" ? null : "drinks"
              )
            }
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Drinks Menu
          </button>
          {openMenu === "drinks" && renderMenu(drinksMenu)}

          <button
            onClick={() =>
              setOpenMenu(
                openMenu === "cocktail" ? null : "cocktail"
              )
            }
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Cocktail Menu
          </button>
          {openMenu === "cocktail" &&
            renderMenu(cocktailMenu)}
        </div>
      </section>

      {/* CART MODAL */}
      <Modal open={openCart} onClose={() => setOpenCart(false)}>
        <Box className="absolute top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">
            Your Cart
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ₦{item.price} × {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="border px-2 rounded"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="border px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <>
              {!showOrderForm ? (
                <button
                  onClick={() => setShowOrderForm(true)}
                  className="mt-6 w-full bg-green-600 text-white py-2 rounded"
                >
                  Place Order
                </button>
              ) : (
                <div className="mt-6 space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) =>
                      setCustomerName(e.target.value)
                    }
                    className="w-full border rounded px-3 py-2"
                  />

                  <input
                    type="text"
                    placeholder="Seat Number"
                    value={seatNumber}
                    onChange={(e) =>
                      setSeatNumber(e.target.value)
                    }
                    className="w-full border rounded px-3 py-2"
                  />

                  <button
                    onClick={handleWhatsAppOrder}
                    disabled={
                      !customerName || !seatNumber
                    }
                    className="w-full bg-green-700 text-white py-2 rounded disabled:opacity-50"
                  >
                    Confirm & Send to WhatsApp
                  </button>
                </div>
              )}
            </>
          )}
        </Box>
      </Modal>

      {/* TOAST */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setToastOpen(false)}
        >
          Order sent successfully 🎉
        </Alert>
      </Snackbar>
    </>
  );
}
