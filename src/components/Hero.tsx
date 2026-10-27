import DataStreamBackground from "./DataStreamBackground";
import logo from "../assets/images/logo.jpeg";

export default function Hero() {
  return (
    <section className="hero">
      <DataStreamBackground />

      <div className="hero-content">
        <img src={logo} alt="LE RAT — logotipo oficial" className="hero-logo" />

        <h1 className="hero-title">LE RAT</h1>

        <p className="hero-description">
          MINIMAL SYNTH · POST-PUNK · ELECTRONIC PUNK
        </p>

        <a className="hero-link" href="#music">
          EXPLORE THE SIGNAL <span aria-hidden="true">↓</span>
        </a>
      </div>

      <span className="hero-coordinate" aria-hidden="true">
        CDMX / 19°25′ N
      </span>
    </section>
  );
}
