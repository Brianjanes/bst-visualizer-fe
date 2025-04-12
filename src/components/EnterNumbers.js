import React, { useState } from "react";
import bstService from "../services/bstService";
import TreeVisualization from "./TreeVisualization";
import styles from "../styles/EnterNumbers.module.css";

function EnterNumbers() {
  const [numbers, setNumbers] = useState("");
  const [tree, setTree] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Parse input string to an array of numbers
    const numbersArray = numbers
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));

    if (numbersArray.length === 0) {
      setError("Please enter valid numbers separated by commas");
      return;
    }

    try {
      const response = await bstService.processNumbers(numbersArray);
      setTree(response);
    } catch (error) {
      setError("Error creating the tree. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Enter Numbers</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          placeholder="Enter numbers separated by commas (e.g., 10, 5, 15, 3)"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Create Tree
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}

      {tree && (
        <div className={styles.treeWrapper}>
          <h3 className={styles.subtitle}>Binary Search Tree</h3>
          <p className={styles.inputDisplay}>
            Input: {tree.inputNumbers.join(", ")}
          </p>
          <TreeVisualization node={tree.rootNode} />
        </div>
      )}
    </div>
  );
}

export default EnterNumbers;
