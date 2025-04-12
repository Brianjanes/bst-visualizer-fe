import React, { useState, useEffect } from "react";
import bstService from "../services/bstService";
import TreeVisualization from "./TreeVisualization";
import styles from "../styles/PreviousTrees.module.css";

function TreeCard({ tree }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = new Date(tree.createdAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.cardHeader}
        onClick={handleToggle}
        onKeyDown={(e) => e.key === "Enter" && handleToggle()}
        role="button"
        tabIndex={0}
      >
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>[{tree.inputNumbers.join(", ")}]</h3>
          <p className={styles.cardDate}>Created {formattedDate}</p>
        </div>
        <button
          className={`${styles.expandButton} ${
            isExpanded ? styles.expanded : ""
          }`}
          aria-label={isExpanded ? "Collapse tree" : "Expand tree"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {isExpanded && (
        <div className={styles.cardContent}>
          <TreeVisualization node={tree.rootNode} />
        </div>
      )}
    </div>
  );
}

function PreviousTrees() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        setLoading(true);
        const data = await bstService.getPreviousTrees();
        setTrees(data);
        setError("");
      } catch (error) {
        setError("Error fetching trees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrees();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Previous Trees</h2>
      {trees.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No trees found. Create one on the home page!</p>
        </div>
      ) : (
        <div className={styles.treeList}>
          {trees.map((tree) => (
            <TreeCard key={tree.id} tree={tree} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PreviousTrees;
