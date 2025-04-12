import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import EnterNumbers from "./components/EnterNumbers";
import PreviousTrees from "./components/PreviousTrees";
import styles from "./styles/App.module.css";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>BST Visualizer</h1>
            <nav className={styles.nav}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ""}`
                }
                end
              >
                Enter Numbers
              </NavLink>
              <NavLink
                to="/previous-trees"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ""}`
                }
              >
                Previous Trees
              </NavLink>
            </nav>
          </div>
        </header>

        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<EnterNumbers />} />
            <Route path="/previous-trees" element={<PreviousTrees />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
