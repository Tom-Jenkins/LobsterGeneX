import icon from "/icon-lobster.svg";
import book from "../assets/book.svg";
// import github from "../assets/github.svg";
import logo from "/logo.svg";
import infoCircle from "../assets/info-circle.svg";
import { useState } from "react";
import Modal from "./Modal";

export default function NavBar() {
  const [modalOpen, setModalOpen] = useState(false);

  function handleModalOpen() {
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  return (
    <>
      <nav className="flex w-full flex-wrap items-center justify-between gap-6 bg-blue-900 px-4 py-3">
        <div className="flex items-center gap-4 text-xl tracking-[.15rem] text-white hover:text-blue-100">
          <img className="h-8" src={icon} alt="lobster icon" />
          <a href="https://www.lobstergenex.com/">LobsterGeneX</a>
        </div>

        <div className="flex gap-5">
          <a onClick={handleModalOpen} className="cursor-pointer">
            <img className="h-5" src={infoCircle} alt="info icon" />
          </a>
          <a href="https://metazoa.ensembl.org/Homarus_gammarus_gca958450375v1/Info/Index">
            <img className="h-5" src={book} alt="book icon" />
          </a>
          <a href="https://tomjenkins.co.uk">
            <img className="h-5" src={logo} alt="logo icon" />
          </a>
        </div>
      </nav>

      <Modal
        modalOpen={modalOpen}
        renderCloseBtn={true}
        renderCloseX={true}
        onClose={handleModalClose}
      >
        <div>
          <h4>About LobsterGeneX</h4>
          <p>
            LobsterGeneX is a React web application designed to visualise gene
            expression results from ten different tissue types from the European
            lobster (<em>Homarus gammarus</em>).
          </p>
          <p>Tissue types analysed:</p>

          <ul>
            <li>Eye, Gill, Nerve, Muscle, Heart</li>
            <li>Hepatopancreas, Gut</li>
            <li>Ovary, Testes</li>
            <li>Juvenile</li>
          </ul>
          <p>
            The gene annotation is available from{" "}
            <a href="https://metazoa.ensembl.org/Homarus_gammarus_gca958450375v1/Info/Index?db=core;g=ENSHGAG00000035340;r=H.gam_scaffold_13920:1596866-1605528">
              EnsemblMetazoa
            </a>
            . All results reserved. Article in preparation (Paris & Jenkins{" "}
            <em>et al</em>.).
          </p>
        </div>
      </Modal>
    </>
  );
}
