import icon from "/icon-lobster.svg";
import book from "../assets/book.svg";
import github from "../assets/github.svg";
import infoCircle from "../assets/info-circle.svg";

const navbar = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "var(--colour-primary)",
    padding: "1rem 2rem",
}

export default function NavBar() {

  return (
    <nav style={navbar}>
        <div className="navbar__title">
            <img className="navbar__title--icon" src={icon} alt="lobster icon" />
            <a href="#">LobsterGeneX</a>
            </div>

            <div className="navbar__icons--container">
            <a href="#">
                <img className="navbar__icons" src={infoCircle} alt="information icon" />
            </a>
            <a href="#">
                <img className="navbar__icons" src={book} alt="book icon" />
            </a>
            <a href="#">
                <img className="navbar__icons" src={github} alt="github icon" />
            </a>
        </div>
    </nav>
  );
}
