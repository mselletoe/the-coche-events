import React, { useEffect, useState, UserRef } from "react";
import "./home.scss";
import { NavLink } from "react-router-dom";

// Import images
import {
  vibe1,
  vibe2,
  vibe3,
  inspirationBanner,
  inspiration2,
  inspiration3,
  inspiration4,
  phone,
  appstore,
  playstore,
  cestaBanner,
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  cochesvg,
  cartrunk,
} from "../../assets/images.js";

function Home() {
  const inspirationImages = [inspirationBanner, inspiration2, inspiration3, inspiration4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVibe, setActiveVibe] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVibe((prev) => (prev + 1) % 3);
    }, 1500);

    const bannerInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % inspirationImages.length);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearInterval(bannerInterval);
    };
  }, []);


  const cards = [
    {
      image: card1,
      desc: "The surprise party they’ll talk about for years.",
    },
    {
      image: card2,
      desc: "Turning ordinary rides into extraordinary memories.",
    },
    {
      image: card3,
      desc: "Moments that matter, right in your backseat.",
    },
    {
      image: card4,
      desc: "From zero to celebration in seconds.",
    },
    {
      image: card5,
      desc: "Confetti, cake, and chaos — in the best way.",
    },
    {
      image: card6,
      desc: "A birthday she never saw coming (literally).",
    },
  ];

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <img src={cochesvg} alt="Coche Logo" className="flying-coche" />
        <div className="hero-content">
          <h1>
            where surprises unfold <br />
            within the <em>confines</em> of a car
          </h1>
        </div>

      <img src={cartrunk} alt="Car Trunk" className="car-trunk" />
    </section>


      {/* VIBE SECTION */}
      <section className="vibe-section">
        <div className="text">
          <h2>
            Start with a vibe,<br />
            <em>we’ll build the moment</em>
          </h2>
          <p>
            Choose a theme, pick a vibe, and leave the magic to us. Every moment starts with the perfect spark.
          </p>
          <NavLink to="/services">
            <button>See More</button>
          </NavLink>
        </div>
        <div className="images">
          <div
            className={`vibe-img ${
              activeVibe === 0 ? "active" : activeVibe === 1 ? "medium" : "small"
            }`}
          >
            <img src={vibe1} alt="Vibe Sample 1" />
          </div>
          <div
            className={`vibe-img ${
              activeVibe === 1 ? "active" : "medium"
            }`}
          >
            <img src={vibe2} alt="Vibe Sample 2" />
          </div>
          <div
            className={`vibe-img ${
              activeVibe === 2 ? "active" : activeVibe === 1 ? "small" : "small"
            }`}
          >
            <img src={vibe3} alt="Vibe Sample 3" />
          </div>
        </div>
      </section>  

    {/* INSPIRATION STORY BANNER */}
      <section className="inspiration-banner">
        <img src={inspirationImages[currentIndex]} alt="Inspiration Story" />
        <div className="overlay">
          <h2>
            Get <em>inspired</em>. <br />
            Imagine yours.
          </h2>
          <NavLink to="/gallery">
            <button>View Gallery</button>
          </NavLink>

        </div>
        <div className="story-bar">
          {inspirationImages.map((_, i) => (
            <div
              key={i}
              className={`segment ${i === currentIndex ? "active" : i < currentIndex ? "filled" : ""}`}
            ></div>
          ))}
        </div>
      </section>

      {/* AUTO-SCROLLING CAROUSEL SECTION */}
      <section className="carousel-section">
        <div className="cards">
          {[...cards, ...cards].map((card, i) => (
            <div className="card" key={i}>
              <img src={card.image} alt={`Card ${i + 1}`} />
              <div className="info">
                <p className="stars">★★★★★</p>
                <p className="desc">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHONE SECTION */}
        <section className="phone-section">
          <div className="phone-wrapper">
            <img src={phone} alt="Coche App Preview" />
          </div>
          <div className="phone-text">
            <h2>Plan. Personalize. Surprise.</h2>
            <p>
              The Coche mobile app lets you design unforgettable in-car surprises with ease —
              from themes to gifts, it’s all just a few taps away.
            </p>
            <div className="store-badges">
              <img src={appstore} alt="Download on the App Store" />
              <img src={playstore} alt="Get it on Google Play" />
            </div>
          </div>
        </section>


      {/* CESTA PROMO */}
      <section className="cesta-section">
        <img src={cestaBanner} alt="Cesta Promo" />
      </section>
    </div>
  );
}

export default Home;
