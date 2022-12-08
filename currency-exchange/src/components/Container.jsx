import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import '../index.css';

import { RxCross2 } from 'react-icons/rx';

const Container = () => {
  const [currencies, setCurrencies] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState([]);
  const [searchedCurrencies, setSearchedCurrencies] = useState([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState({ first: null, second: null });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(currencies);
    setSearchedCurrencies(currencies);
  }, [currencies]);

  useEffect(() => {
    console.log(selectedCurrencies);
  }, [selectedCurrencies]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.currencyapi.com/v3/currencies?apikey=SgMiRsRrIIT4q2UsVACTweIqhnE74fVgvGH6ttzO`,
      );
      setCurrencies(Object.values(response.data.data));
    } catch (err) {
      setCurrencies(null);
    }
  };

  return (
    <div className="w-screen h-screen lg:w-[75%] lg:h-[500px] bg-gray-600 flex flex-col lg:flex-row items-center justify-around rounded-lg">
      <div className="bg-red-600 h-full w-full flex flex-col items-center justify-center gap-4">
        <div className="lg:w-[60%] w-[70%] flex h-full flex-col items-center justify-center gap-4">
          <label htmlFor="name" className="w-full relative">
            <input
              type="number"
              id="name"
              placeholder="quantity"
              className="p-2 w-full outline-none base placeholder:opacity-0 border-[1px] rounded-lg bg-transparent text-lg text-white"
              autoComplete="off"
            />
            <span className="absolute bottom-2 left-1 duration-300 text-lg text-white">
              Quantity
            </span>
          </label>

          <div className="w-full flex flex-col gap-2 relative">
            {selectedCurrencies.first && (
              <motion.div
                initial={{ x: -180, y: 100, rotate: -60, scale: 0, opacity: 0 }}
                animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                exit={{ x: -180, y: 100, rotate: -60, opacity: 0 }}
                className="absolute right-2 top-2 z-20"
              >
                <RxCross2
                  size={30}
                  onClick={() => {
                    setSelectedCurrencies({ ...selectedCurrencies, first: null });
                    setSearchedTerm('');
                    setSearchedCurrencies(currencies);
                  }}
                />
              </motion.div>
            )}
            <input
              type="text"
              className="p-2 w-full outline-none base placeholder:opacity-0 border-[1px] rounded-lg bg-transparent text-lg text-white"
              autoComplete="off"
              value={selectedCurrencies.first ? selectedCurrencies.first : searchedTerm}
              onChange={(e) => {
                setSearchedTerm(e.target.value);
                setSearchedCurrencies(
                  currencies.filter(
                    (c) =>
                      c.code.toLowerCase().includes(e.target.value.toLowerCase()) ||
                      c.name.toLowerCase().includes(e.target.value.toLowerCase()),
                  ),
                );
              }}
            />
            {!selectedCurrencies.first && (
              <AnimatePresence>
                <motion.div
                  initial={{ x: -180, y: 100, rotate: -60, scale: 0, opacity: 0 }}
                  animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ x: -180, y: 100, rotate: -60, opacity: 0 }}
                  className="h-[200px] overflow-y-auto flex flex-col border-[1px] p-2 rounded-lg"
                >
                  {searchedCurrencies.map((curr) => (
                    <div
                      key={curr.code}
                      className="flex justify-between"
                      onClick={() =>
                        setSelectedCurrencies({ ...selectedCurrencies, first: curr.code })
                      }
                    >
                      <span>{curr.code}</span>
                      <span>{curr.name}</span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
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
