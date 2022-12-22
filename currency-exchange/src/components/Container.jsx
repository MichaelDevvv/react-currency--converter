import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import axios from 'axios';

import '../index.css';

import { RxCross2 } from 'react-icons/rx';

const Container = () => {
  const [currencies, setCurrencies] = useState([]);
  const [searchedTerms, setSearchedTerms] = useState({ first: '', second: '' });
  const [quantity, setQuantity] = useState({ first: '', second: '' });
  const [searchedCurrencies, setSearchedCurrencies] = useState([]);
  const [searchedCurrencies1, setSearchedCurrencies1] = useState([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState({ first: '', second: '' });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(currencies);
    setSearchedCurrencies(currencies);
    setSearchedCurrencies1(currencies);
  }, [currencies]);

  useEffect(() => {
    console.log(selectedCurrencies);
    console.log(quantity);
  }, [selectedCurrencies, quantity]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.currencyapi.com/v3/currencies?apikey=3HSvDZS8K61Hgbnhqg8sLo2Jz2IjJBFT0qU7Ij74`,
      );
      setCurrencies(Object.values(response.data.data));
    } catch (err) {
      setCurrencies(null);
    }
  };

  return (
    <div className="w-screen h-screen lg:w-[75%] lg:h-[500px] bg-transparent flex flex-col lg:flex-row items-center justify-around rounded-lg">
      <div className="bg-white/[0.19] rounded-b-2xl lg:rounded-2xl backdrop-blur-[7.1px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] h-full w-full flex flex-col items-center justify-center gap-4">
        <div className="lg:w-[60%] w-[75%] flex h-full flex-col items-center justify-center gap-4">
          <label htmlFor="name" className="w-full relative">
            <input
              type="number"
              id="name"
              placeholder="quantity"
              className="p-2 w-full outline-none base placeholder:opacity-0 border-[1px] rounded-lg bg-transparent text-lg text-white"
              autoComplete="off"
              value={quantity.first}
              onChange={(e) => setQuantity({ ...quantity, first: e.target.value })}
            />
            <span className="absolute bottom-2 left-1 duration-300 text-lg text-white">
              Quantity
            </span>
          </label>

          <div className="w-full flex flex-col gap-2 relative overflow-hidden">
            <AnimatePresence>
              {selectedCurrencies.first && (
                <motion.div
                  initial={{ x: -180, y: 100, rotate: -60, scale: 0, opacity: 0 }}
                  animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-2 top-2 z-20 cursor-pointer text-white"
                >
                  <RxCross2
                    size={30}
                    onClick={() => {
                      setSelectedCurrencies({ ...selectedCurrencies, first: null });
                      setSearchedTerms((prev) => ({ first: '', second: prev.second }));
                      setSearchedCurrencies(currencies);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <input
              type="text"
              className="p-2 w-full outline-none base placeholder:opacity-0 border-[1px] rounded-lg bg-transparent text-lg text-white"
              autoComplete="off"
              value={selectedCurrencies.first ? selectedCurrencies.first : searchedTerms.first}
              onChange={(e) => {
                setSearchedTerms((prev) => ({ first: e.target.value, second: prev.second }));
                setSearchedCurrencies(
                  currencies.filter(
                    (c) =>
                      c.code.toLowerCase().includes(e.target.value.toLowerCase()) ||
                      c.name.toLowerCase().includes(e.target.value.toLowerCase()),
                  ),
                );
              }}
            />
            <AnimatePresence>
              {!selectedCurrencies.first && (
                <MotionConfig transition={{ duration: 0.2 }}>
                  <motion.div
                    initial={{ x: -180, y: 100, rotate: -60, scale: 0, opacity: 0 }}
                    animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[200px] text-white overflow-y-auto flex flex-col border-[1px] rounded-lg"
                  >
                    {searchedCurrencies.map((curr) => (
                      <div
                        key={curr.code}
                        className="flex justify-between cursor-pointer py-2 px-3 hover:bg-[#4568dc]"
                        onClick={() =>
                          setSelectedCurrencies({ ...selectedCurrencies, first: curr.code })
                        }
                      >
                        <span>{curr.code}</span>
                        <span>
                          {curr.name.length < 20 ? curr.name : `${curr.name.slice(0, 10)}...`}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </MotionConfig>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className=" h-auto w-auto flex items-center justify-center p-3 flex-col gap-20">
        <lord-icon
          src="https://cdn.lordicon.com/akuwjdzh.json"
          trigger="loop-on-hover"
          colors="primary:#f2f2f2"
          style={{ width: '100px', height: '100px' }}
          onClick={() => {
            setSelectedCurrencies((prev) => ({
              first: prev.second,
              second: prev.first,
            }));

            setQuantity((prev) => ({
              first: prev.second,
              second: prev.first,
            }));
          }}
        />

        <button className="hidden lg:block h-14 w-40 rounded-lg bg-white/[0.19] backdrop-blur-[7.1px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-white border-2 border-white">
          Convert
        </button>
      </div>
      <div className="bg-white/[0.19] rounded-t-2xl lg:rounded-2xl backdrop-blur-[7.1px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] h-full w-full flex flex-col items-center justify-center">
        <div className="lg:w-[60%] w-[75%] flex h-full flex-col items-center justify-center gap-4">
          <label htmlFor="name1" className="w-full relative">
            <input
              type="number"
              id="name1"
              placeholder="quantity"
              className="p-2 w-full outline-none base placeholder:opacity-0 border-[1px] rounded-lg bg-transparent text-lg text-white"
              autoComplete="off"
              value={quantity.second}
              onChange={(e) => setQuantity({ ...quantity, second: e.target.value })}
            />
            <span className="absolute bottom-2 left-1 duration-300 text-lg text-white">
              Quantity
            </span>
          </label>

          <div className="w-full flex flex-col gap-2 relative overflow-hidden">
            <AnimatePresence>
              {selectedCurrencies.second && (
                <motion.div
                  initial={{ x: -180, y: 100, rotate: -60, scale: 0, opacity: 0 }}
                  animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-2 top-2 z-20 cursor-pointer text-white"
                >
                  <RxCross2
                    size={30}
                    onClick={() => {
                      setSelectedCurrencies({ ...selectedCurrencies, second: null });
                      setSearchedTerms((prev) => ({ first: prev.first, second: '' }));
                      setSearchedCurrencies1(currencies);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <input
              type="text"
              className="p-2 w-full outline-none base placeholder:opacity-0 border-[1px] rounded-lg bg-transparent text-lg text-white"
              autoComplete="off"
              value={selectedCurrencies.second ? selectedCurrencies.second : searchedTerms.second}
              onChange={(e) => {
                setSearchedTerms((prev) => ({ first: prev.first, second: e.target.value }));
                setSearchedCurrencies1(
                  currencies.filter(
                    (c) =>
                      c.code.toLowerCase().includes(e.target.value.toLowerCase()) ||
                      c.name.toLowerCase().includes(e.target.value.toLowerCase()),
                  ),
                );
              }}
            />
            <AnimatePresence>
              {!selectedCurrencies.second && (
                <MotionConfig transition={{ duration: 0.2 }}>
                  <motion.div
                    initial={{ x: -180, y: 100, rotate: -60, scale: 0, opacity: 0 }}
                    animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[200px] text-white overflow-y-auto flex flex-col border-[1px] rounded-lg"
                  >
                    {searchedCurrencies1.map((curr) => (
                      <div
                        key={curr.code}
                        className="flex justify-between cursor-pointer py-2 px-3 hover:bg-[#4568dc]"
                        onClick={() =>
                          setSelectedCurrencies({ ...selectedCurrencies, second: curr.code })
                        }
                      >
                        <span>{curr.code}</span>
                        <span>
                          {curr.name.length < 20 ? curr.name : `${curr.name.slice(0, 10)}...`}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </MotionConfig>
              )}
            </AnimatePresence>
          </div>
        </div>
        <button className="lg:hidden h-14 w-40 rounded-lg bg-white/[0.19] backdrop-blur-[7.1px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-white border-2 border-white mt-1">
          Convert
        </button>
      </div>
    </div>
  );
};

export default Container;
