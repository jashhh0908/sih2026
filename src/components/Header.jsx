import headerLogo from "../assets/header-logo.png";

export default function Header() {
  return (
    <header className="app-header">
      <img className="app-header__logo" src={headerLogo} alt="IgnisEye" />
      <div className="app-header__titles">
        <span className="app-header__product">IgnisEye</span>
        <span className="app-header__subtitle">Thermal Intelligence System</span>
      </div>
      <div className="app-header__spacer" />
      <span className="app-header__tag">Prototype</span>
    </header>
  );
}
