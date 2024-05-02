import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={629}
    height={670}
    viewBox="0 -1000 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{ width: "100%", height: "100%" }}
  >
    <g id="left-bottom-group">
      <path
        id="Vector 22"
        d="M153 187.209C37.4 118.009 2.83333 158.376 0 187.209V670.209H561.5L590.5 639.709C660.1 570.509 619.5 500.876 590.5 474.709C492.833 407.709 268.6 256.409 153 187.209Z"
        fill="url(#paint0_linear_742_118)"
      />
      <path
        id="Vector 21"
        d="M297 2.16572C197.4 15.7657 57.5 19.1657 0 19.1657V670.166H593.5C574.333 643.499 524.8 575.366 480 516.166C424 442.166 447 180.166 447 126.166C447 72.1657 421.5 -14.8343 297 2.16572Z"
        fill="url(#paint1_linear_742_118)"
      />
      <path
        id="Vector 20"
        d="M208.791 87.2144C126.474 24.3836 35.298 42.0256 0 58.7004V670H500C452.214 632.815 351.648 537.535 331.668 453.894C306.693 349.343 311.688 165.753 208.791 87.2144Z"
        fill="url(#paint2_linear_742_118)"
      />
      <path
        id="Subtract"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M314 93C330.795 96.9328 343.302 112.006 343.302 130H343.315C343.791 111.567 357.394 96.3995 375.122 93.5C357.075 90.5483 343.302 74.8825 343.302 56C343.302 73.9942 330.795 89.0672 314 93Z"
        fill="#FDFDFD"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_742_118"
        x1={628.5}
        y1={542.709}
        x2={-0.499991}
        y2={377.709}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#030F59" />
        <stop offset={1} stopColor="#030E56" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_742_118"
        x1={-0.00000133589}
        y1={26}
        x2={522.5}
        y2={670}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B10AC9" />
        <stop offset={0.257218} stopColor="#DB09CC" />
        <stop offset={1} stopColor="#750AD9" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_742_118"
        x1={92.4076}
        y1={43}
        x2={250.442}
        y2={669.889}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F956F9" />
        <stop offset={1} stopColor="#9577FA" />
      </linearGradient>
    </defs>
  </svg>
)
export { SvgComponent as ReactComponent }
