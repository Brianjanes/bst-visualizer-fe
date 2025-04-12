import React, { useRef, useEffect } from "react";
import Tree from "react-d3-tree";
import styles from "../styles/TreeVisualization.module.css";

const customNodeStyles = {
  circle: {
    fill: "var(--background-light)",
    r: 20,
    stroke: "var(--primary-color)",
    strokeWidth: 2,
  },
  text: {
    fill: "var(--primary-color)",
    fontFamily: "JetBrains Mono, monospace",
    fontWeight: 500,
    fontSize: "16px",
    dominantBaseline: "middle",
    textAnchor: "middle",
    paintOrder: "stroke",
    stroke: "none",
  },
};

function TreeVisualization({ node }) {
  const treeContainerRef = useRef(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  useEffect(() => {
    if (treeContainerRef.current) {
      const { width, height } =
        treeContainerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  if (!node) return null;

  const convertToD3Tree = (bstNode) => {
    if (!bstNode) return { name: "" };

    return {
      name: bstNode.value.toString(),
      children: [
        bstNode.left ? convertToD3Tree(bstNode.left) : null,
        bstNode.right ? convertToD3Tree(bstNode.right) : null,
      ].filter(Boolean),
    };
  };

  const treeData = convertToD3Tree(node);

  return (
    <div className={styles.treeContainer} ref={treeContainerRef}>
      <Tree
        data={treeData}
        orientation="vertical"
        pathFunc="step"
        translate={{
          x: dimensions.width / 2,
          y: 50,
        }}
        nodeSize={{ x: 80, y: 80 }}
        renderCustomNodeElement={({ nodeDatum }) => (
          <g>
            <circle {...customNodeStyles.circle} />
            <text
              dy=".1em"
              style={customNodeStyles.text}
              className="tree-number"
            >
              {nodeDatum.name}
            </text>
          </g>
        )}
        separation={{ siblings: 1, nonSiblings: 2 }}
        zoomable={false}
        enableLegacyTransitions={false}
        transitionDuration={0}
        pathClassFunc={() => styles.link}
      />
    </div>
  );
}

export default TreeVisualization;
