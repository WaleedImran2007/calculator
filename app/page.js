"use client"

import React, { useEffect, useState, useRef } from "react";
import './page.css';


export default function CalculatorPage() {

  const [display, setdisplay] = useState("0")

  const handleClick = (value) => {
    setdisplay((prev) =>
      prev === "0" ? value.toString() : prev + value.toString()
    )
  }

  const handleClear = () => {
    setdisplay("0")
  }

  const handleEqual = () => {
    try {

      let expression = display;

      const openCount = (expression.match(/\(/g) || []).length;
      const closeCount = (expression.match(/\)/g) || []).length;
      if (openCount > closeCount) {
        expression += ")".repeat(openCount - closeCount);
      }

      expression = expression
        .replace(/(\d+)%/g, "($1/100)")
        .replace(/mod/g, "%")
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/pow/g, "**")
        .replace(/sin\(([^)]+)\)/g, (_, angle) => {
          const angleNum = eval(angle);
          if (angleNum % 180 === 0) return "0";
          return `Math.sin((${angle})*Math.PI/180)`;
        })
        .replace(/cos\(([^)]+)\)/g, (_, angle) => {
          const angleNum = eval(angle);
          if ((angleNum - 90) % 180 === 0) return "0";
          return `Math.cos((${angle})*Math.PI/180)`;
        })
        .replace(/tan\(([^)]+)\)/g, (_, angle) => {
          const angleNum = eval(angle);
          if (angleNum % 90 === 0) {
            if ((angleNum - 90) % 180 === 0) {
              return angleNum % 180 === 90 ? "Infinity" : "-Infinity";
            }
            return "0";
          }
          return `Math.tan((${angle})*Math.PI/180)`;
        })
        .replace(/log\(([^)]+)\)?/g, (_, value) => `Math.log10(${value})`)
        .replace(/ln\(([^)]+)\)?/g, (_, value) => `Math.log(${value})`);

      let result = eval(expression);
      setdisplay(result.toString());
    } catch {
      setdisplay("Error");
    }
  };

  const deletePrev = () => {
    setdisplay(display.slice(0, -1))
  }

  const handleSqrt = () => {
    try {
      setdisplay(eval(Math.sqrt(display)).toString())
    }

    catch {
      setdisplay("Error")
    }
  }

  const handleFactorial = () => {
    let num = parseInt(display)
    let fact = 1;

    for (let index = 1; index <= num; index++) {
      fact = fact * index;

    }

    setdisplay(fact)
  }

  const handleNegate = () => {
    if (display === "0") return;
    if (display.startsWith("-")) {
      setdisplay(display.slice(1))
    }
    else {
      setdisplay("-" + display)
    }
  }

  const handleReciprocal = () => {
    try {
      const value = eval(display)
      if (value === 0) {
        setdisplay("Infinity");
        return;
      }
      else {
        const reciprocal = 1 / value;
        setdisplay(reciprocal.toString())
      }
    }
    catch {
      setdisplay("Error")
    }
  }


  return (
    <main className="min-h-screen text-white flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-6">
      <div className="calculator flex flex-col w-full max-w-md sm:max-w-lg md:w-[60vw]">
        <h2 className="text-2xl sm:text-3xl font-bold my-3 text-center sm:text-left">Calculator</h2>
        <div className="bg-white/5 rounded-2xl p-4 shadow-2xl backdrop-blur-md min-h-[70vh]">
          <input
            onChange={(e) => setdisplay(e.target.value)}
            value={display}
            type="text"
            className="text-right text-2xl sm:text-3xl bg-black w-full min-h-[10vh] rounded-2xl mx-auto outline-none p-3"
          />

          <div className="buttons grid grid-cols-5 gap-2 p-4">

            {/* FIRST ROW */}
            <button onClick={() => handleClick(Math.PI)} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">π</button>
            <button onClick={() => handleClick(Math.E)} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">e</button>
            <button onClick={() => handleClick("mod")} className="cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium flex justify-center shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">mod</button>
            <button onClick={handleFactorial} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">!</button>
            <button onClick={() => handleClear()} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-red-500 text-white hover:bg-red-700">C</button>

            {/* SECOND ROW */}
            <button onClick={() => handleClick("sin(")} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">sin</button>
            <button onClick={() => handleClick("cos(")} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">cos</button>
            <button onClick={() => handleClick("tan(")} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">tan</button>
            <button onClick={() => handleClick("log(")} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">log</button>
            <button onClick={() => handleClick("ln(")} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">ln</button>

            {/* THIRD ROW */}
            <button onClick={() => { handleClick("(") }} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">(</button>
            <button onClick={() => { handleClick(")") }} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">)</button>
            <button onClick={() => handleClick("pow")} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">x^y</button>
            <button onClick={handleSqrt} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">√</button>
            <button onClick={deletePrev} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">⌫</button>

            {/* FOURTH ROW */}
            <button onClick={() => handleClick(7)} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">7</button>
            <button onClick={() => handleClick(8)} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">8</button>
            <button onClick={() => handleClick(9)} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">9</button>
            <button onClick={() => handleClick("÷")} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">÷</button>
            <button onClick={handleReciprocal} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">1/x</button>

            {/* FIFTH ROW */}
            <button onClick={() => handleClick(4)} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">4</button>
            <button onClick={() => handleClick(5)} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">5</button>
            <button onClick={() => handleClick(6)} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">6</button>
            <button onClick={() => handleClick("x")} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">x</button>
            <button onClick={handleNegate} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">+/-</button>

            {/* SIXTH ROW */}
            <button onClick={() => handleClick(1)} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">1</button>
            <button onClick={() => handleClick(2)} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">2</button>
            <button onClick={() => handleClick(3)} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">3</button>
            <button onClick={() => handleClick("-")} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">-</button>
            <button onClick={() => handleClick("%")} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">%</button>

            {/* SEVENTH ROW */}
            <button onClick={() => handleClick(0)} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10 col-span-2">0</button>
            <button onClick={() => handleClick(".")} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">.</button>
            <button onClick={handleEqual} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-gradient-to-br from-indigo-500 to-purple-500 text-white">=</button>
            <button onClick={() => handleClick("+")} className="flex justify-center cursor-pointer py-3 px-6 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform active:scale-95 bg-white/6 text-white hover:bg-white/10">+</button>

          </div>
        </div>
      </div>
    </main>
  )
}
