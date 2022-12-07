import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
const Container = () => {
  const [currencies, setCurrencies] = useState([]);
  const [searchedCurrencies, setSearchedCurrencies] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(currencies);
    setSearchedCurrencies(currencies);
  }, [currencies]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.currencyapi.com/v3/currencies?apikey=oWgtInb3kraIpSvEHR3ni0zgY4YTyNiWJz9pIUyO`,
      );
      setCurrencies(Object.values(response.data.data));
    } catch (err) {
      setCurrencies(null);
    }
  };

  return (
    <div className="w-screen h-screen lg:w-[75%] lg:h-[500px] bg-gray-600 flex flex-col lg:flex-row items-center justify-around rounded-lg">
      <div className="bg-red-600 h-full w-full flex flex-col items-center justify-center gap-4">
        <label htmlFor="name" className="relative">
          <input
            type="number"
            id="name"
            placeholder="quantity"
            className="p-2 w-full outline-none base placeholder:opacity-0 border-[1px] rounded-lg bg-transparent text-lg text-white"
            autoComplete="off"
          />
          <span className="absolute bottom-2 left-1 duration-300 text-lg text-white">Quantity</span>
        </label>

        <div className="">
          <input
            type="text"
            className="p-2 w-full outline-none base placeholder:opacity-0 border-[1px] rounded-lg bg-transparent text-lg text-white"
            autoComplete="off"
            onChange={(e) => {
              setSearchedCurrencies(
                currencies.filter(
                  (c) =>
                    c.code.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    c.name.toLowerCase().includes(e.target.value.toLowerCase()),
                ),
              );
            }}
          />
          <div className="h-[200px] overflow-y-auto">
            {searchedCurrencies.map((curr) => (
              <div key={curr.code} className="flex justify-between">
                <span>{curr.code}</span>
                <span>{curr.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-red-200 h-auto w-auto flex items-center justify-center">
        <lord-icon
          src="https://cdn.lordicon.com/akuwjdzh.json"
          trigger="hover"
          colors="primary:#1D4ED8"
          style={{ width: '100px', height: '100px' }}
        ></lord-icon>
      </div>
      <div className="bg-red-600 h-full w-full flex flex-col items-center justify-center"></div>
    </div>
  );
};

export default Container;
