"use client";

import { useState } from "react";
import { Modal, Box, Snackbar, Alert } from "@mui/material";
import Image from "next/image";

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


const DrinksMenu: MenuItem[] = [
  { id: 13, name: "19 CRIMES CHARD", price: 11250 },
  { id: 14, name: "19 Crimes Rose", price: 11250 },
  { id: 15, name: "4TH STREET ROSE", price: 6250},
  { id: 16, name: "4TH STREET SPARKLING RED GRAPE", price: 6250 },
  { id: 17, name: "4th Street Red", price: 10625 },
  { id: 18, name: "4th Street White", price: 6250 },
  { id: 19, name: "ACE bitters", price: 2500 },
  { id: 20, name: "AVION RESERVA(cristalino)", price: 322125 },
  { id: 21, name: "Absolute Elyx", price: 37500 },
  { id: 22, name: "Absolute Mandrin", price: 23750 },
  { id: 23, name: "Absolute Plain", price: 23125 },
  { id: 24, name: "Absolute Rapsberry", price: 23750 },
  { id: 25, name: "Absolute Vanilla", price: 23750 },

  { id: 26, name: "Ace of Spade", price: 726000 },
  { id: 27, name: "Agavales tequila", price: 16500 },
  { id: 28, name: "Agor", price: 10625},
  { id: 29, name: "Almond Cookies", price: 3125 },
  { id: 30, name: "Amabile Red", price: 9750},
  { id: 31, name: "Amabile Rose", price: 9750},
  { id: 32, name: "Amabile White", price: 9750 },
  { id: 33, name: "Amarula 700ML", price: 16000 },
  { id: 34, name: "American Honey", price: 31875 },
  { id: 35, name: "Americano", price: 3750 },
  { id: 36, name: "Amstel Malta", price: 1250 },
  { id: 37, name: "Andre Brut", price: 11625 },
  { id: 38, name: "Andre Rose", price: 14250 },

  { id: 39, name: "Aperol", price: 20000 },
  { id: 40, name: "Apothic Red", price: 17500 },
  { id: 41, name: "Arrabella Red", price: 16875},
  { id: 42, name: "Azul clase", price: 405000 },
  { id: 43, name: "B & G ( Cuvee Spéciale)", price: 8125},
  { id: 44, name: "B&G Cuvee Speciale nature sweet", price: 11625},
  { id: 45, name: "BAILEYS SHOT", price: 5625 },
  { id: 46, name: "BAIN'S", price: 25625 },
  { id: 47, name: "BALLANTINES FINEST", price: 18750 },
  { id: 48, name: "BALVENIE 12YRS", price: 104250 },
  { id: 49, name: "BALVENIE 14YRS", price: 162500 },
  { id: 50, name: "BELAIRE RARE LUXE", price: 55000 },
  { id: 51, name: "BLACK BULLET", price: 2500 },

  { id: 52, name: "BLUE CURACAO", price: 26250 },
  { id: 53, name: "BOTTLE WATER", price: 500 },
  { id: 54, name: "BROKEN GLASS", price: 3000},
  { id: 55, name: "BUDWEISER", price: 2000 },
  { id: 56, name: "Bacardi Gold", price: 23000},
  { id: 57, name: "Bacardi Spice", price: 20000},
  { id: 58, name: "Bacardi White", price: 21150 },
  { id: 59, name: "Baileys", price: 27250 },
  { id: 60, name: "Ballentine's shot", price: 4375 },
  { id: 61, name: "Balvanie classic", price: 125000 },
  { id: 62, name: "Balvenie 16yrs", price: 354450 },
  { id: 63, name: "Balvenie 21yrs", price: 585000 },
  { id: 64, name: "Bamoc 58 Red", price: 10625 },

  { id: 65, name: "Bamoc 58 Sweet Red", price: 10625 },
  { id: 66, name: "Banana Bread", price: 3750 },
  { id: 67, name: "Beef Burge", price: 8125},
  { id: 68, name: "Beefeater Gin", price: 18625 },
  { id: 69, name: "Belaire Gold with Light", price: 70875},
  { id: 70, name: "Belaire Gold without Light", price: 55000},
  { id: 71, name: "Belaire Rose with Light", price: 70875 },
  { id: 72, name: "Belaire Rose without Light", price: 55000 },
  { id: 73, name: "Belena Red", price: 29250 },
  { id: 74, name: "Belena White	", price: 26250},
  { id: 75, name: "Belvedere", price: 81250 },
  { id: 76, name: "Best Cream", price: 10000 },
  { id: 77, name: "Big Catfish", price: 17500 },

  { id: 78, name: "Big Remy Martins VSOP 1L", price: 150000 },
  { id: 79, name: "Big Tilapia", price: 20000 },
  { id: 80, name: "Black & White", price: 21250},
  { id: 81, name: "Black Label", price: 53750 },
  { id: 82, name: "Belaire Gold with Light", price: 70875},
  { id: 83, name: "Belaire Gold without Light", price: 55000},
  { id: 84, name: "Belaire Rose with Light", price: 70875 },
  { id: 85, name: "Belaire Rose without Light", price: 55000 },
  { id: 86, name: "Belena Red", price: 29250 },
  { id: 87, name: "Belena White	", price: 26250},
  { id: 88, name: "Belvedere", price: 81250 },
  { id: 89, name: "Best Cream", price: 10000 },
  { id: 90, name: "Big Catfish", price: 17500 },
];

// const drinksSubMenus: Record<string, MenuItem[]> = {
//   Vodka: [{ id: 13, name: "Premium Vodka", price: 8000 }],
//   Cocktails: [{ id: 14, name: "Mojito", price: 3500 }],
//   Beer: [{ id: 15, name: "Heineken", price: 1500 }],
//   Wines: [{ id: 16, name: "Red Wine", price: 9000 }],
//   Spirits: [{ id: 17, name: "Whiskey", price: 7000 }],
//   Cider: [{ id: 18, name: "Apple Cider", price: 2500 }],
//   Mocktails: [{ id: 19, name: "Virgin Mojito", price: 3000 }],
//   Water: [{ id: 20, name: "Bottled Water", price: 500 }],
//   Milks: [{ id: 21, name: "Chocolate Milk", price: 1200 }],
//   Juices: [
//     { id: 22, name: "Fresh Orange Juice", price: 2000 },
//     { id: 23, name: "Pineapple Juice", price: 2000 },
//   ],
//   "Coffee & Tea": [{ id: 24, name: "Cappuccino", price: 2200 }],
//   "Sodas & Soft Drinks": [
//     { id: 25, name: "Pepsi", price: 1000 },
//     { id: 26, name: "Fanta", price: 1000 },
//     { id: 27, name: "Sprite", price: 1000 },
//   ],
// };

const extrasMenu: MenuItem[] = [
  { id: 91, name: "Shisha (Single Flavor)", price: 8000 },
  { id: 92, name: "Shisha (Double Flavor)", price: 10000 },
  { id: 93, name: "Shisha Refill", price: 5000 },
  { id: 94, name: "Extra Coal", price: 1500 },
];

export default function Home() {
  const [openMenu, setOpenMenu] =
    useState<"food" | "drinks" | "extras" | null>(null);
  const [openDrinkSub, setOpenDrinkSub] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  /* ===== NEW STATES ===== */
  const [openAttendantModal, setOpenAttendantModal] = useState(false);
  const [attendantTable, setAttendantTable] = useState("");
  const [attendantRequest, setAttendantRequest] = useState("");
  const [showSongsSoon, setShowSongsSoon] = useState(false);
const [showKaraokeSoon, setShowKaraokeSoon] = useState(false);
const [showShoutoutSoon, setShowShoutoutSoon] = useState(false);

const showTemporarily = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
  setState(true);
  setTimeout(() => {
    setState(false);
  }, 1000); // 1 second
};



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

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const vatRate = 0.075;
  const vatAmount = Math.round(totalAmount * vatRate);
  const grandTotal = totalAmount + vatAmount;

  /* ================= MENU RENDER ================= */
  const renderMenu = (items: MenuItem[]) => (
    <div className="bg-gray-300 rounded-lg p-4 space-y-3">
      {items.map((item) => {
        const qty = cart.find((c) => c.id === item.id)?.quantity || 0;

        return (
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium text-black">{item.name}</p>
              <p className="text-sm text-gray-800">₦{item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromCart(item.id)}
                className="border px-2 rounded border-black text-black"
              >
                −
              </button>
              <span className="text-black">{qty}</span>
              <button
                onClick={() => addToCart(item)}
                className="border px-2 rounded border-black text-black"
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

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

    const message = `New Order 🍽️
Name: ${customerName}
Seat Number: ${seatNumber}

Order Items:
${itemsText}

VAT (7.5%): ₦${vatAmount}
Total: ₦${grandTotal}`;

    const phone = "2348021999995";
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setToastOpen(true);
    setCart([]);
    setCustomerName("");
    setSeatNumber("");
    setShowOrderForm(false);
    setOpenCart(false);
  };

  /* ================= UI ================= */
  return (
    <>
    <div className="relative w-full h-[220px] rounded-xl overflow-hidden">
    <Image
      src="/logos.jpeg"
      alt="Restaurant banner"
      fill
      className="object-contain"
      priority
    />
  </div>
      <section
        className="relative  bg-contain  p-6"
        style={{ backgroundImage: "url('/bgimg.jpeg')" }}

        
      >
        
        {/* PREVIEW + NEW ROW BUTTONS */}
        <div className="fixed bottom-6 right-6 z-50 space-y-2">
          <button
            onClick={() => {
              setOpenCart(true);
              setIsMinimized(false);
            }}
            className="bg-black px-4 py-2 rounded-full text-orange-400 flex gap-2"
          >
            Preview
            <span>{cart.reduce((a, b) => a + b.quantity, 0)}</span>
          </button>

          {/* NEW ROW */}
          
        </div>

        {/* MENUS (UNCHANGED) */}
        <div className="max-w-md mx-auto mt-1 space-y-4">
          <button
            onClick={() =>
              setOpenMenu(openMenu === "food" ? null : "food")
            }
            className="w-full bg-black text-white py-6 rounded-lg"
          >
            Food Menu
          </button>
          {openMenu === "food" && renderMenu(foodMenu)}

          {/* <button
            onClick={() =>
              setOpenMenu(openMenu === "drinks" ? null : "drinks")
            }
            className="w-full bg-black text-white py-6 rounded-lg"
          >
            Drinks Menu
          </button>

          {openMenu === "drinks" && (
            <div className="space-y-3">
              {Object.entries(drinksSubMenus).map(([title, items]) => (
                <div key={title}>
                  <button
                    onClick={() =>
                      setOpenDrinkSub(
                        openDrinkSub === title ? null : title
                      )
                    }
                    className="w-full bg-gray-800 text-white py-2 rounded-lg"
                  >
                    {title}
                  </button>
                  {openDrinkSub === title && renderMenu(items)}
                </div>
              ))}
            </div>
          )} */}

            <button
            onClick={() =>
              setOpenMenu(openMenu === "drinks" ? null : "drinks")
            }
            className="w-full bg-black text-white py-6 rounded-lg"
          >
            Drinks Menu
          </button>
          {openMenu === "drinks" && renderMenu(DrinksMenu)}
            



          <button
            onClick={() =>
              setOpenMenu(openMenu === "extras" ? null : "extras")
            }
            className="w-full bg-black text-white py-6 rounded-lg"
          >
            Extras
          </button>
          {openMenu === "extras" && renderMenu(extrasMenu)}
        </div>



        <div className="flex flex-row gap-2 justify-center mt-8">

       <div>
        {/* Call Attendants */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => showTemporarily(setShowSongsSoon)}
            className="bg-gray-400 text-black font-bold text-xs px-6 py-4 rounded-full"
          >
            Call Attendants
          </button>

          {showSongsSoon && (
            <span className="text-[12px] text-white mt-1 font-bold bg-black px-3 py-1 rounded-md">
              Coming soon
            </span>
          )}
        </div>

        {/* Special Song */}
        <div className="flex flex-col items-center mt-2">
          <button
            onClick={() => showTemporarily(setShowSongsSoon)}
            className="bg-gray-400 text-black font-bold text-xs px-2 py-4 rounded-full"
          >
            Special Song Request
          </button>

          {showSongsSoon && (
            <span className="text-[12px] text-white mt-1 font-bold bg-black px-3 py-1 rounded-md">
              Coming soon
            </span>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div>
        {/* Karaoke */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => showTemporarily(setShowKaraokeSoon)}
            className="bg-gray-400 text-black font-bold text-xs px-2 py-4 rounded-full"
          >
            Karaoke Song Request
          </button>

          {showKaraokeSoon && (
            <span className="text-[12px] text-white mt-1 font-bold bg-black px-3 py-1 rounded-md">
              Coming soon
            </span>
          )}
        </div>

        {/* Shout Out */}
        <div className="flex flex-col items-center mt-2">
          <button
            onClick={() => showTemporarily(setShowShoutoutSoon)}
            className="bg-gray-400 text-black font-bold text-xs px-2 py-4 rounded-full"
          >
            Special Shout out Request
          </button>

          {showShoutoutSoon && (
            <span className="text-[12px] text-white mt-1 font-bold bg-black px-3 py-1 rounded-md">
              Coming soon
            </span>
          )}
        </div>
      </div>
</div>


      </section>



      

            

      {/* CALL ATTENDANT MODAL */}
      <Modal
        open={openAttendantModal}
        onClose={() => setOpenAttendantModal(false)}
      >
        <Box className="absolute bg-white rounded-lg p-4 top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 space-y-3">

        <button
      onClick={() => setOpenAttendantModal(false)}
      className="absolute top-2 right-2 text-black text-lg font-bold"
      aria-label="Close"
    >
      ×
    </button>

          <h2 className="font-semibold text-black">Call Attendant</h2>

          <select
  value={seatNumber}
  onChange={(e) => setSeatNumber(e.target.value)}
  className="w-full px-3 py-2 rounded border border-black bg-white text-black"
>
  <option value="" disabled>
    Select Table Number
  </option>
  {Array.from({ length: 10 }, (_, i) => (
    <option key={i + 1} value={i + 1}>
      Table {i + 1}
    </option>
  ))}
</select>

          <textarea
            value={attendantRequest}
            onChange={(e) => setAttendantRequest(e.target.value)}
            placeholder="Your request"
            className="w-full px-3 py-2 border rounded border-black text-black"
          />

          <button
            disabled={!attendantTable || !attendantRequest}
            onClick={() => {
              const message = `Call Attendant 🚨
Table: ${attendantTable}
Request: ${attendantRequest}`;

              window.open(
                `https://wa.me/2348021999995?text=${encodeURIComponent(
                  message
                )}`,
                "_blank"
              );

              setOpenAttendantModal(false);
              setAttendantTable("");
              setAttendantRequest("");
            }}
            className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
          >
            Send Request
          </button>
        </Box>
      </Modal>

      {/* CART MODAL (UNCHANGED) */}
      {/* CART MODAL */}
<Modal open={openCart} onClose={() => setOpenCart(false)}>
  <Box className="absolute bg-white rounded-lg p-4 top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2">
    <div className="flex justify-between items-center mb-3">
      <h2 className="font-semibold text-black">Your Cart</h2>
      <button
        onClick={() => {
          setIsMinimized(true);
          setOpenCart(false);
        }}
        className="border px-2 rounded"
      >
         ×
      </button>
    </div>

    {cart.length === 0 ? (
      <p className="text-gray-500">Cart is empty</p>
    ) : (
      <>
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center mb-2"
          >
            <div>
              <p className="font-medium text-black ">{item.name}</p>
              <p className="text-sm text-black">
                ₦{item.price} × {item.quantity}
              </p>
            </div>
            {/* <div className="flex gap-2">
              <button
                onClick={() => removeFromCart(item.id)}
                className="border px-2 rounded border-black text-black"
              >
                −
              </button>
              <span className="text-black">{item.quantity}</span>
              <button
                onClick={() => addToCart(item)}
                className="border px-2 rounded border-black text-black"
              >
                +
              </button>
            </div> */}
          </div>
        ))}

        <div className="mt-3 space-y-1 text-right">
          <p className="text-sm text-black">
            VAT (7.5%): ₦{vatAmount}
          </p>
          <p className="font-semibold text-black">
            Total: ₦{grandTotal}
          </p>
        </div>

        {/* {!showOrderForm ? (
          <button
            onClick={() => setShowOrderForm(true)}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded"
          >
            Place Order
          </button>
        ) : (
          <div className="mt-4 space-y-3">
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-3 py-2 rounded border border-black"
            />
            
            <select
  value={seatNumber}
  onChange={(e) => setSeatNumber(e.target.value)}
  className="w-full px-3 py-2 rounded border border-black bg-white text-black"
>
  <option value="" disabled>
    Select Table Number
  </option>
  {Array.from({ length: 10 }, (_, i) => (
    <option key={i + 1} value={i + 1}>
      Table {i + 1}
    </option>
  ))}
</select>

            <button
              disabled={!customerName || !seatNumber}
              onClick={handleWhatsAppOrder}
              className="w-full bg-green-700 text-white py-2 rounded disabled:opacity-50"
            >
              Confirm & Send to WhatsApp
            </button>
          </div>
        )} */}
      </>
    )}
  </Box>
</Modal>


      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
      >
        <Alert severity="success">Order sent successfully 🎉</Alert>
      </Snackbar>
    </>
  );
}
