'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Section5b() {
  interface ProductI {
    image: string;
    quantity: number;
  }

  const [data, setData] = useState<ProductI[]>([]); // data from api
  const [cart, setCart] = useState<ProductI[]>([]); // Cart mein jo data store hoga

  useEffect(() => {
    async function fetchData() {
      let products = await (
        await fetch('http://localhost:3000/api/TrendingProducts')
      ).json();
      setData(products);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Add to Cart functionality
  const addToCart = (product: ProductI) => {
    const storedCart = localStorage.getItem('cart');
    const cartCopy: ProductI[] = storedCart ? JSON.parse(storedCart) : [];

    const existingProduct = cartCopy.find(
      (item) => item.image === product.image
    );

    if (existingProduct) {
      existingProduct.quantity += 1; 
    } else {
      cartCopy.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cartCopy));
    setCart(cartCopy);
  };

  return (
    <div className="flex flex-col text-[#151875] pt-24 pb-24 items-center gap-[10px] md:gap-[20px]">
      <h1 className="font-bold text-[30px] md:text-[38px] lg:text-[42px]">
        Trending Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center">
        {data.map((blog, index) => (
          <div
            key={index}
            className="blog w-[270px] h-[350px] group flex-col flex items-center pt-3 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-[247px] h-[244px] relative bg-[#F5F6F8] flex justify-center items-center">
              <Image
                src={blog.image}
                alt="Product Image"
                height={200}
                width={200}
              />
              <button
                onClick={() => addToCart(blog)}
                className="h-[40px] w-full bg-[#3e4088] hidden group-hover:block hover:bg-[#2d2f62] absolute bottom-0 rounded-t-md font-bold text-white"
              >
                Add To Cart
              </button>
            </div>
            <div className="mt-4">
              <div className="font-semibold text-[16px] text-[#151875]">
                Cantilever chair
              </div>

              <div className="flex gap-2 justify-center items-center">
                <h1 className="text-[14px] font-semibold text-[#151875]">
                  $26.00
                </h1>
                <h1 className="text-[12px] font-[400] line-through text-[#1518754D]">
                  $42.00
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
