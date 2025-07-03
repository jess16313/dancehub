import React, { useState,useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, useTransform, useScroll } from "framer-motion";
import Navbar from "./assets/nav-bar.jsx";
import './App.css';

function App() {

    const Card = ({ card }) => {
        return(
            <div key={card.id} className="individual-card">
                <div className="card-1"></div>
                <div className="card-title">
                    <p>{card.title}</p>
                </div>
            </div>
        )
    }

    const HorizontalScrollCarousel = () => {
        const TargetRef = useRef(null);
        const { scrollYProgress } =useScroll({
            target: TargetRef,
        })

        const x = useTransform(scrollYProgress, [0,1], ["1%","-95%"])
        return (
            <section className='carousel-holder'>
                <div className= 'card-holder'>
                    <motion.div style={{ x }} className='animator'>
                        {cards.map((card) => {
                            return <Card card={card} key={card.id}/>
                        })}
                    </motion.div>
                </div>
            </section>
        )
    }

    return (
      <>
          <Navbar/>
          <div className="title-container">
              <div className="title-text">
                  <h1>DANCEHUB</h1>
                  <p>The hot spot for communication betweeen dancers. Keeping your videos, soundcuts, formations, and
                      conversations all in one place!</p>
              </div>
          </div>
          <div className="container-2">
          <div className="scroll-down">
          <span className='horizontal-scroll'>
              Scroll Down
          </span>
          </div>
          <HorizontalScrollCarousel/>
          <div className="scroll-up">
          <span className='horizontal-scroll'>
              Scroll up
          </span>
          </div>
          </div>
      </>
  );

}

export default App;

const cards = [
    {
        title:"Title 1",
        id:1,
    },
    {
        title:"Title 2",
        id:2,
    },
    {
        title:"Title 3",
        id:3,
    },
    {
        title:"Title 4",
        id:4,
    },
    {
        title:"Title 5",
        id:5,
    },
    {
        title:"Title 6",
        id:6,
    },
]
