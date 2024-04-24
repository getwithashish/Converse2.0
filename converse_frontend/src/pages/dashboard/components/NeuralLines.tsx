import React from "react";
import { motion } from "framer-motion";

const colors = [
  "#FFFFFF",
  "#00cc88",
  "#0099ff",
  "#0099ff",
  "#00cc88",
  "#FFFFFF",
  "#0099ff",
  "#0099ff",
  "#00cc88",
  "#FFFFFF"
];

const paths = [
    "M1 11C224 20.8333 616.8 80.6 918 405C1219.2 729.4 1713 888.5 1858 907",
    "M15.5 81C148.833 44 438.9 103 964.5 437C1490.1 771 1819.17 795.333 1864 790.5",
    "M39 157C91.5 126.667 342.5 136.1 926.5 416.5C1510.5 696.9 1796.83 699 1867 665",
    "M33 247.5C89.6667 228 349.5 236.3 935.5 425.5C1521.5 614.7 1790.67 588 1852 551",
    "M50.5 367C208.333 351.5 606.9 341.5 938.5 425.5C1270.1 509.5 1687.67 479.833 1855 454.5",
    "M1837.5 370C1597.33 405 1081.3 464.5 938.5 422.5C760 370 141.5 425 80 489.5",
    "M97.5 682.5C182.333 588 469.3 403.7 938.5 422.5C1407.7 441.3 1727.67 325.333 1829 265",
    "M77 910C184.167 752.333 505.9 434.1 935.5 422.5C1365.1 410.9 1702.17 229 1817 139.5",
    "M170.5 983C216.167 855.667 432.5 565.9 932.5 425.5C1432.5 285.1 1738.5 84.6667 1829 2"
  ];
  

const NeuralLines = () => (
  <svg
    viewBox="600 0 800 800"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}
  >
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {paths.map((path, index) => (
        <motion.path
          key={index}
          id={`Vector ${index + 1}`}
          d={path}
          stroke={colors[index]}
          strokeWidth={7}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 10, delay: index * 0.1, repeat: Infinity }}
          strokeLinecap="round"
        />
      ))}
    </motion.g>
  </svg>
);

export default NeuralLines;
