"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ProductI {
  image: string;
  name:string;
  quantity: number;
  price: number;
}

export default function Cart() {
  const [cart, setCart] = useState<ProductI[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleUpdateCart = () => {
    alert("Cart updated successfully!");
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    alert("Cart cleared successfully!");
  };

  return (
    <div className="text-red w-[100vw] ">
      <div className="lg:h-[286px] h-[120px] mt-5 sm:mb-16 mb-10 md:h-[220px] w-full bg-[#F6F5FF] flex flex-col items-start justify-center">
        <div className="flex flex-col items-start justify-center lg:pl-28 pl-10 md:pl-16">
          <h1 className="lg:text-[36px] text-[20px] md:text-[28px] font-bold text-[#101750]">
            Shopping Cart
          </h1>
          <p className="text-black lg:text-[16px] text-[12px] md:text-[14px]">
            Home . Pages <span className="text-[#FB2E86]">. Shopping Cart</span>
          </p>
        </div>
      </div>

      <div className="p-6 text-[#1D3178]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
              {cart.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-4">Product</th>
                      <th className="pb-4">Price</th>
                      <th className="pb-4">Quantity</th>
                      <th className="pb-4">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center">
                            <Image
                              src={item.image}
                              alt={"image"}
                              width={100}
                              height={100}
                              className="w-16 h-16 rounded-lg mr-4"
                            />
                            <div>
                              <p className="font-semibold">{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">${item.price}</td>
                        <td className="py-4">
                          <input
                            type="number"
                            className="w-16 text-center border rounded-lg"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value, 10) || 1;
                              setCart((prevCart) =>
                                prevCart.map((cartItem, cartIndex) =>
                                  cartIndex === index
                                    ? { ...cartItem, quantity: newQuantity }
                                    : cartItem
                                )
                              );
                            }}
                          />
                        </td>
                        <td className="py-4">${(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="font-bold text-3xl text-center">Your cart is empty.</p>
              )}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleUpdateCart}
                  className="bg-[#FB2E86] hover:bg-[#c92b70] h-[39px] w-[134px] rounded-[2px] text-white"
                >
                  Update Cart
                </button>
                <button
                  onClick={handleClearCart}
                  className="bg-[#FB2E86] hover:bg-[#c92b70] h-[39px] w-[134px] rounded-[2px] text-white"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Totals Section */}
            <div className="text-[#1D3178] pt-8">
              <h2 className="font-bold text-lg mb-4 lg:text-center lg:mr-7">Cart Totals</h2>
              <div className="bg-[#F4F4FC] h-[240px] w-full sm:w-[371px] rounded-[3px] shadow-lg p-6">
                <div className="border-b pb-4">
                  <div className="flex font-semibold justify-between mb-2">
                    <p>Subtotal:</p>
                    <p>${calculateTotal()}</p>
                  </div>
                  <div className="flex font-semibold justify-between">
                    <p>Totals:</p>
                    <p>${calculateTotal()}</p>
                  </div>
                </div>
                <p className="text-sm text-[#8A91AB] my-4">Shipping & taxes calculated at checkout.</p>
                <button className="bg-[#19D16F] hover:bg-[#2aac67] text-white w-full sm:w-[312px] rounded-[3px] h-[40px] py-2">
                  Proceed To Checkout
                </button>
              </div>

              {/* Calculate Shipping Section */}
              <h2 className="font-bold text-lg mt-6 lg:text-center lg:mr-7 mb-4">Calculate Shipping</h2>
              <div className="bg-[#F4F4FC] h-[240px] w-full sm:w-[371px] rounded-[3px]">
                <form>
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full bg-[#F4F4FC] border p-2 rounded-lg mb-2"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full bg-[#F4F4FC] border p-2 rounded-lg mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="w-full bg-[#F4F4FC] border p-2 rounded-lg mb-4"
                  />
                  <button className="bg-[#FB2E86] rounded-[3px] hover:bg-[#d23076] h-[41px] w-[179px] text-white py-2 ml-5">
                    Calculate Shipping
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
