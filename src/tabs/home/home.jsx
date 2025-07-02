import React from "react";
import "./home.scss";

// Import images
import {
  vibe1,
  vibe2,
  inspirationBanner,
  phone,
  cestaBanner,
  card1,
  card2,
  card3,
} from "../../assets/images.js";

function Home() {
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="overlay">
          <h1>
            where surprises unfold <br />
            within the <em>confines</em> of a car
          </h1>
        </div>
      </section>

      {/* VIBE SECTION */}
      <section className="vibe-section">
        <div className="text">
          <h2>
            Start with a vibe,<br />
            <em>we’ll build the moment</em>
          </h2>
          <button>See More</button>
        </div>
        <div className="images">
          <img id="vibe1" src={vibe1} alt="Vibe Sample 1" />
          <img id="vibe2" src={vibe2} alt="Vibe Sample 2" />
        </div>
      </section>

      {/* INSPIRATION BANNER */}
      <section className="inspiration-banner">
        <div className="overlay">
          <h2>
            Get <em>inspired</em>. <br />
            Imagine yours.
          </h2>
          <button>View Gallery</button>
        </div>
        <img src={inspirationBanner} alt="Inspiration Banner" />
      </section>

      {/* PHONE SECTION */}
      <section className="phone-section">
        <img id="phone" src={phone} alt="Phone Showcase" />
      </section>

      {/* CESTA PROMO */}
      <section className="cesta-section">
        <div className="text-overlay">
          <h2>cesta</h2>
          <p>SATIN PETALS</p>
          <button>View Shop</button>
        </div>
        <img src={cestaBanner} alt="Cesta Promo" />
      </section>

      {/* GALLERY / TESTIMONIALS */}
      <section className="carousel-section">
        <button className="arrow left">‹</button>
        <div className="cards">
          {[card1, card2, card3].map((card, index) => (
            <div className="card" key={index}>
              <img src={card} alt={`Card ${index + 1}`} />
              <div className="info">
                <p className="stars">★★★★★</p>
                <p className="desc">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Lorem ipsum dolor.
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="arrow right">›</button>
      </section>
    </div>
  );
}

export default Home;
