import { SVGProps } from "react";
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

export const RainLines = (props: SVGProps<SVGSVGElement>) => (
  <svg
      viewBox="0 0 554 1021"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ width: "100%", height: "100%" }}
    >
    {[
        'M91 68L91 285L91 502',
        'M263 747L263 881.5L263 1016',
        'M549 5L549 139.5L549 274',
        'M190 152L190 286.5L190 421',
        'M353 350L353 484.5L353 619',
        'M291 517L291 608L291 699',
        'M409 716L409 759.5L409 803',
        'M476 699L476 849L476 999',
        'M420 68L420 249L420 430',
        'M303 31L303 165.5L303 300',
        'M490.5 307L490.5 441.5L490.5 576',
        'M5 350L5 415.5L5.00001 481',
        'M35 536L35 631.25L35 726.5L35 917',
        'M147.5 406L147.5 540.5L147.5 675',
        'M147 406L147 604L147 802',
        'M549 447L549 581.5L549 716'
    ].map((path, index) => (
      <motion.path
        key={index}
        id={`Vector ${index + 1}`}
        d={path}
        stroke={colors[index]}
        strokeWidth={5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0] }} 
        transition={{ duration: 5, delay: index * 1, repeat: Infinity }}
        strokeLinecap="round"
      />
    ))}
  </svg>
);
