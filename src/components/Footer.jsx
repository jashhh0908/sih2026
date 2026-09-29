import cornerLogo from "../assets/corner-logo.png";

export default function Footer() {
  return (
    <footer className="app-footer">
      <img className="app-footer__logo" src={cornerLogo} alt="IgnisEye" />
      <span>
        Prototype developed by <strong>The Council</strong> for Smart India Hackathon 2026
        — Problem Statement 26162. Demonstration data only.
      </span>
    </footer>
  );
}
