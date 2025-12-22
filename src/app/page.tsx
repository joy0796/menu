"use client";

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

/* ================= DRINK SUB-MENUS ================= */
const drinksSubMenus: Record<string, MenuItem[]> = {
  Vodka: [{ id: 13, name: "Premium Vodka", price: 8000 }],
  Cocktails: [{ id: 14, name: "Mojito", price: 3500 }],
  Beer: [{ id: 15, name: "Heineken", price: 1500 }],
  Wines: [{ id: 16, name: "Red Wine", price: 9000 }],
  Spirits: [{ id: 17, name: "Whiskey", price: 7000 }],
  Cider: [{ id: 18, name: "Apple Cider", price: 2500 }],
  Mocktails: [{ id: 19, name: "Virgin Mojito", price: 3000 }],
  Water: [{ id: 20, name: "Bottled Water", price: 500 }],
  Milks: [{ id: 21, name: "Chocolate Milk", price: 1200 }],
  Juices: [
    { id: 22, name: "Fresh Orange Juice", price: 2000 },
    { id: 23, name: "Pineapple Juice", price: 2000 },
  ],
  "Coffee & Tea": [{ id: 24, name: "Cappuccino", price: 2200 }],
  "Sodas & Soft Drinks": [
    { id: 25, name: "Pepsi", price: 1000 },
    { id: 26, name: "Fanta", price: 1000 },
    { id: 27, name: "Sprite", price: 1000 },
  ],
};

/* ================= EXTRAS MENU ================= */
const extrasMenu: MenuItem[] = [
  { id: 40, name: "Shisha (Single Flavor)", price: 8000 },
  { id: 41, name: "Shisha (Double Flavor)", price: 10000 },
  { id: 42, name: "Shisha Refill", price: 5000 },
  { id: 43, name: "Extra Coal", price: 1500 },
];

/* ================= COMPONENT ================= */
export default function Home() {
  const [openMenu, setOpenMenu] = useState<
    "food" | "drinks" | "extras" | null
  >(null);

  const [openDrinkSub, setOpenDrinkSub] = useState<string | null>(null);

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
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

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
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">₦{item.price}</p>
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
      <section
        className="relative min-h-screen bg-contain bg-center p-6"
        style={{ backgroundImage: "url('/logos.jpeg')" }}
      >
        <button
  onClick={() => setOpenCart(true)}
  className="fixed bottom-6 right-4 bg-black px-4 py-2 rounded-full shadow flex items-center gap-2 z-50 text-white"
>
  Shop here
  <span className="font-semibold">
    {cart.reduce((a, b) => a + b.quantity, 0)}
  </span>
</button>

        <div className="max-w-md mx-auto mt-24 space-y-4">
          {/* FOOD */}
          <button
            onClick={() => setOpenMenu(openMenu === "food" ? null : "food")}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Food Menu
          </button>
          {openMenu === "food" && renderMenu(foodMenu)}

          {/* DRINKS */}
          <button
            onClick={() =>
              setOpenMenu(openMenu === "drinks" ? null : "drinks")
            }
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Drinks Menu
          </button>

          {openMenu === "drinks" && (
            <div className="space-y-3">
              {Object.entries(drinksSubMenus).map(([title, items]) => (
                <div key={title}>
                  <button
                    onClick={() =>
                      setOpenDrinkSub(openDrinkSub === title ? null : title)
                    }
                    className="w-full bg-gray-800 text-white py-2 rounded-lg"
                  >
                    {title}
                  </button>
                  {openDrinkSub === title && renderMenu(items)}
                </div>
              ))}
            </div>
          )}

          {/* EXTRAS */}
          <button
            onClick={() =>
              setOpenMenu(openMenu === "extras" ? null : "extras")
            }
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Extras
          </button>
          {openMenu === "extras" && renderMenu(extrasMenu)}
        </div>
      </section>

      {/* CART MODAL — UNCHANGED */}
      <Modal open={openCart} onClose={() => setOpenCart(false)}>
        <Box className="absolute top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Your Cart</h2>

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
                      onClick={() => removeFromCart(item.id)}
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
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Seat Number"
                    value={seatNumber}
                    onChange={(e) => setSeatNumber(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <button
                    onClick={handleWhatsAppOrder}
                    disabled={!customerName || !seatNumber}
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
        <Alert severity="success" onClose={() => setToastOpen(false)}>
          Order sent successfully 🎉
        </Alert>
      </Snackbar>
    </>
  );
}
