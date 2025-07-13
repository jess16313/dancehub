import React, { useState,useRef } from 'react';
import {Routes, Route, Navigate, Link} from 'react-router-dom';
import { motion, useTransform, useScroll } from "framer-motion";
import Navbar from "../assets/nav-bar.jsx";
import '../App.css';


function Default() {

    const Card = ({ card }) => {
        return(
            <div key={card.id} className="individual-card">
                <div className="card-1">
                    <h2>{card.title}</h2>
                    <p>{card.content}</p>
                </div>
            </div>
        )
    }

    const HorizontalScrollCarousel = () => {
        const TargetRef = useRef(null);
        const { scrollYProgress } =useScroll({
            target: TargetRef,
        })

        const x = useTransform(scrollYProgress, [0,1], ["50%","-80%"])
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
          </span>
                </div>
                <HorizontalScrollCarousel/>
                <div className="scroll-up">
          <span className= 'horizontal-scroll'>
          </span>
                </div>
            </div>
            <div className="video-container">
                {/*    video here trust*/}
            </div>
            <div className="sign-up-container">
                <h4>So click here to get started!</h4>
                <div className="sign-up-button">
                    <Link to="/signup">Sign Up!</Link>
                </div>
            </div>
        </>
    );

}

export default Default;

const cards = [
    {
        title:"Easily Communicate between dancers!",
        id:1,
        content:"Adding different members into different chats has never been easier! With this format fo servers and channels you can be in different chats, different dances, even different dance teams, and switch between them with ease."
    },
    {
        title:"Title 2",
        id:2,
        content:"Adding different members into different chats has never been easier! With this format fo servers and channels you can be in different chats, different dances, even different dance teams, and switch between them with ease."
    },
    {
        title:"Title 3",
        id:3,
        content:"Adding different members into different chats has never been easier! With this format fo servers and channels you can be in different chats, different dances, even different dance teams, and switch between them with ease."
    },
    {
        title:"Title 4",
        id:4,
        content:"Adding different members into different chats has never been easier! With this format fo servers and channels you can be in different chats, different dances, even different dance teams, and switch between them with ease."
    },
    {
        title:"Title 5",
        id:5,
        content:"Adding different members into different chats has never been easier! With this format fo servers and channels you can be in different chats, different dances, even different dance teams, and switch between them with ease."
    },
    {
        title:"Title 6",
        id:6,
        content:"Adding different members into different chats has never been easier! With this format fo servers and channels you can be in different chats, different dances, even different dance teams, and switch between them with ease."
    },
]
