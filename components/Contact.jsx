import { Icon } from "./Icons";
import Reveal from "./Reveal";
import Glow from "./Glow";

const INFO = [
  { icon: Icon.pin, lines: ["3801 Calhoun Memorial", "Hwy, Easley, SC 29640, USA"], href: "https://maps.google.com/?q=3801+Calhoun+Memorial+Hwy,+Easley,+SC+29640" },
  { icon: Icon.phone, lines: ["+1 864-343-1512"], href: "tel:+18643431512" },
  { icon: Icon.mail, lines: ["cdt.orders@gmail.com"], href: "mailto:cdt.orders@gmail.com" },
  { icon: Icon.clock, lines: ["9:00 AM to 17:00 PM"], href: null },
];

/* ---------- Helicopter (spinning rotor + carries the QR) ---------- */
function Helicopter() {
  return (
      <svg viewBox="0 0 216.93 71.36" className="w-full overflow-visible" aria-hidden="true">
      <g className="heli-rotor">
      <path transform="translate(93.22 0)" d="M0.00100708 7.19611L85.177 0.0101034C85.782 -0.0408966 86.387 0.102108 86.904 0.418108C87.698 0.903108 87.579 1.4021 86.651 1.4771L4.35699 8.1021L3.112 7.57511L0 7.8141L0 7.19611L0.00100708 7.19611Z" fill="#8c8c8c" />
      <path transform="translate(0 0)" d="M87.4298 7.19611L2.25377 0.0101034C1.64877 -0.0408966 1.04377 0.102108 0.526765 0.418108C-0.267235 0.903108 -0.148229 1.4021 0.779771 1.4771L83.0738 8.1021L84.3188 7.57511L87.4308 7.8141L87.4308 7.19611L87.4298 7.19611Z" fill="#8c8c8c" />
      </g>
      <path transform="translate(83.23 52.72)" d="M10.3306 18.1718C9.22659 18.1718 8.33059 17.2758 8.33059 16.1718C8.33059 12.1398 5.39561 6.18483 1.02661 3.74783C0.0616068 3.20883 -0.284403 1.99084 0.253597 1.02584C0.792597 0.0608428 2.01058 -0.28416 2.97558 0.25384C8.83058 3.52184 12.3296 10.9128 12.3296 16.1718C12.3306 17.2758 11.4346 18.1718 10.3306 18.1718Z" fill="#8c8c8c" />
      <path transform="translate(48.14 52.72)" d="M2 18.1714C0.895 18.1714 0 17.2754 0 16.1714C0 10.9124 3.499 3.52142 9.355 0.253422C10.323 -0.284577 11.54 0.0624257 12.077 1.02543C12.615 1.99043 12.269 3.20841 11.304 3.74741C6.935 6.18541 3.99901 12.1394 3.99901 16.1714C4.00001 17.2754 3.104 18.1714 2 18.1714Z" fill="#8c8c8c" />
      <path transform="translate(38.84 64.01)" d="M63.9611 7.34958L10.5911 7.34958C6.58506 7.34958 2.84606 5.56056 0.332056 2.44156C-0.187944 1.79656 -0.0859392 0.851585 0.559061 0.332585C1.20406 -0.189415 2.15005 -0.0844253 2.66805 0.559575C4.60905 2.96857 7.49706 4.35056 10.5911 4.35056L63.9611 4.35056C64.7891 4.35056 65.4611 5.02256 65.4611 5.85056C65.4611 6.67856 64.7891 7.34958 63.9611 7.34958Z" fill="#8c8c8c" />
      <path transform="translate(29.68 11.05)" d="M173.062 27.13L171.612 33.43L175.052 41.48L165.352 41.48L161.002 36.49C158.952 34.14 156.342 32.43 153.472 31.48L153.462 31.48C150.992 30.66 148.332 30.41 145.672 30.78L70.1217 41.48C55.9917 46.19 32.0617 50.98 17.0517 49.28C17.0517 49.28 17.0517 49.28 17.0417 49.28C11.3417 48.63 6.6217 46.97 3.6117 44.46C1.8517 43.01 0.671704 41.26 0.211704 39.26C-0.798296 34.86 1.8617 30.06 6.9917 25.82C8.1117 24.9 9.3417 24 10.6917 23.14C15.1817 20.24 20.8617 17.77 27.2417 16.09L35.5217 5.48L74.9717 5.48L87.1017 21.31C87.1017 21.31 142.362 21.31 142.662 21.29C146.432 21.16 150.042 20.19 153.282 18.52C158.062 16.07 162.022 12.11 164.462 7.09L167.902 0L179.272 0L173.062 27.13Z" fill="#ff4340" />
      <path transform="translate(76.95 14.8)" d="M27.703 1.72301L26.362 0L1.21301 0L0 1.72301L27.703 1.72301Z" fill="#cc3b39" />
      <path transform="translate(84.16 13.57)" d="M12.638 1.235L11.678 0L0.868988 0L0 1.235L12.638 1.235Z" fill="#8c8c8c" />
      <path transform="translate(87.44 11.05)" d="M5.78799 2.51599L3.83099 0L1.76999 0L0 2.51599L5.78799 2.51599Z" fill="#8c8c8c" />
      <path transform="translate(85.5 5.8)" d="M9.65002 2.78999C9.65002 4.32999 7.49002 5.58 4.83002 5.58C2.16002 5.58 0 4.32999 0 2.78999C0 1.24999 2.16002 0 4.83002 0C7.49002 0 9.65002 1.24999 9.65002 2.78999Z" fill="#8c8c8c" />
      <path transform="translate(85.5 5.8)" d="M9.65002 2.78999L0 2.78999C0 1.24999 2.16002 0 4.83002 0C7.49002 0 9.65002 1.24999 9.65002 2.78999Z" fill="#cc3b39" />
      <path transform="translate(29.68 36.68)" d="M175.052 15.85L165.352 15.85L161.002 10.86C157.182 6.48002 151.422 4.34001 145.672 5.15001L70.1217 15.85C55.9917 20.56 32.0617 25.35 17.0517 23.65C17.0517 23.65 17.0517 23.65 17.0417 23.65C8.01171 22.62 1.4517 19.06 0.211704 13.63C-0.798296 9.23001 1.8617 4.43 6.9917 0.190002C-0.478297 8.3 -0.208303 16.11 15.0317 19.93C32.7917 24.38 49.4817 20.43 62.2217 14.91L63.3617 14.41C73.0617 10.07 80.3217 4.91001 83.8217 2.12001C85.5417 0.74001 87.6817 0 89.8817 0L173.402 0L171.612 7.8L175.052 15.85Z" fill="#483432" />
      <path transform="translate(93.04 36.68)" d="M110.04 0L109.7 1.5L24.66 5.86C21 6.05 17.4 6.89001 14.03 8.35001L0 14.41C9.7 10.07 16.96 4.91001 20.46 2.12001C22.18 0.74001 24.32 0 26.52 0L110.04 0Z" fill="#cc3b39" />
      <path transform="translate(187.36 23.82)" d="M29.568 11.089C23.121 16.58 17.213 22.178 11.089 22.178C4.96499 22.178 0 17.214 0 11.089C0 4.964 4.96499 2.84217e-14 11.089 2.84217e-14C17.213 0 22.419 5.09 29.568 11.089Z" fill="#cc3b39" />
      <path transform="translate(188.55 25.03)" d="M8.23401 16.468C12.7815 16.468 16.468 12.7815 16.468 8.23401C16.468 3.6865 12.7815 0 8.23401 0C3.6865 0 0 3.6865 0 8.23401C0 12.7815 3.6865 16.468 8.23401 16.468Z" fill="#483432" />
      <path transform="translate(195.71 32.17)" d="M5.47198 2.73601C5.47198 4.24701 4.24699 5.472 2.73599 5.472C1.22499 5.472 0 4.24701 0 2.73601C0 1.22501 1.22499 0 2.73599 0C4.24699 0 5.47198 1.22501 5.47198 2.73601Z" fill="#cc3b39" />
      <path transform="translate(187.36 23.59)" d="M0.00277066 11.323C-0.0342293 9.68095 0.299784 8.02395 0.978784 6.50995C1.67178 5.00395 2.69679 3.64096 3.97979 2.57096C6.54879 0.419955 10.1198 -0.450052 13.4108 0.222948C16.7108 0.947948 19.5398 2.85796 22.1138 4.87496C24.6988 6.91796 27.1128 9.14495 29.5698 11.323C26.9938 9.28595 24.4888 7.15595 21.8798 5.17995C19.2758 3.23595 16.4878 1.36795 13.3118 0.711947C10.1598 0.0309468 6.75179 0.857953 4.2218 2.86795C1.6908 4.87295 0.0877707 8.03195 0.00277066 11.323Z" fill="#483432" />
      <path transform="translate(172.34 11.05)" d="M36.1 2.22L26.11 2.22L33.09 5.48L25.05 5.48L31.51 9.31L23.37 9.31C23.37 9.31 16.76 20.9 0 21.29C9.32 20.96 17.71 15.52 21.8 7.09L25.24 0L36.61 0L36.1 2.22Z" fill="#cc3b39" />
      <path transform="translate(34.96 23.2)" d="M36.9106 23.5788C39.9706 25.2988 46.4906 25.3488 48.3506 25.0188C39.8306 27.5488 29.1106 27.5988 23.0806 25.7788C26.1406 28.0788 30.2606 29.2288 32.7906 29.5188C26.6206 30.4588 16.4806 30.9288 9.10061 29.1788C0.510607 27.1188 -4.3194 22.0488 5.2806 11.1388C5.3206 11.0888 5.3706 11.0388 5.4106 10.9888C5.5406 10.9088 5.6706 10.8288 5.8006 10.7488C5.8106 10.7288 5.83061 10.7188 5.85061 10.7188C9.24061 8.5788 13.2906 6.6788 17.7906 5.1888C19.1406 4.7288 20.5306 4.3188 21.9606 3.9388L24.5906 0.568804C40.6706 -1.9712 58.0706 4.8188 58.0706 4.8188C79.7106 12.6688 58.3606 25.4988 36.9106 23.5788Z" fill="#cc3b39" />
      <path transform="translate(56.92 16.53)" d="M59.86 15.83L57.76 17.14C54.62 19.11 50.66 19.3 47.38 17.58C31.32 9.21 15.717 6.842 0 10.61L8.28 0L47.73 0L59.86 15.83Z" fill="#cc3b39" />
      <path transform="translate(62.31 16.53)" d="M49.85 9.8L49.51 10.01C46.67 11.78 43.1 11.95 40.13 10.4C26.3 3.19999 17.55 1.24 0 3.7L2.89001 0L42.34 0L49.85 9.8Z" fill="#ff4340" />
      <path transform="translate(33.75 29.42)" d="M18.1818 0L9.8718 22.96L9.8518 23C9.5918 22.93 9.3118 22.89 9.0618 22.81C6.8918 22.19 5.1218 21.39 3.7318 20.5C2.8518 19.94 2.1318 19.34 1.5718 18.71C0.751797 17.79 0.291796 16.87 0.101796 15.92C-0.108204 14.88 -0.00820184 13.68 0.541798 12.33C0.751798 11.82 1.03179 11.28 1.38179 10.72C1.66179 10.27 1.9918 9.83 2.3718 9.38C2.6618 9.03 2.9918 8.68 3.3418 8.34C4.6918 7 6.46181 5.68 8.58181 4.42C11.2518 2.84 14.4818 1.34 18.1818 0Z" fill="#00bcd2" />
      <path transform="translate(193.41 50.67)" d="M11.32 1.85999L1.62 1.85999L0 0L10.53 0L11.32 1.85999Z" fill="#cc3b39" />
      <path transform="translate(49.21 26.19)" d="M36.88 9.1271C31.54 9.3971 26.26 10.0371 21.26 11.0171C19.02 11.4571 16.85 11.9671 14.74 12.5271C14.22 12.6671 13.7 12.8171 13.19 12.9571C10.39 13.7671 7.73 14.6871 5.27 15.6971C3.4 16.4771 1.63 17.3071 0 18.1871L5.73 2.3771C6.18 2.2371 6.62001 2.10709 7.07001 1.99709C9.82001 1.21709 12.57 0.677087 15.26 0.367087C20.47 -0.262913 25.43 -0.0729126 29.62 0.867087C32.07 1.40709 34.16 3.03709 35.28 5.27709C36.31 7.34709 36.88 9.1271 36.88 9.1271Z" fill="#00bcd2" />
      <path transform="translate(33.75 29.42)" d="M2.33893 19.286C1.51593 18.367 1.05593 17.439 0.864926 16.491C0.577926 15.055 0.883931 13.314 2.14793 11.294C4.46693 7.61699 10.0199 3.97099 17.8269 0.996994L18.1879 0C9.78393 3.046 3.81092 6.86699 1.38192 10.719C0.118925 12.739 -0.188073 14.48 0.099927 15.916C0.290927 16.864 0.750926 17.792 1.57393 18.711C2.05693 19.245 2.66593 19.761 3.37793 20.253C2.99093 19.938 2.63793 19.616 2.33893 19.286Z" fill="#005161" />
      <path transform="translate(54.59 26.19)" d="M25.02 1.76236C26.484 2.09036 27.818 2.79436 28.919 3.76636C27.742 2.31436 26.097 1.28036 24.242 0.865358C17.534 -0.636642 8.83499 -0.215636 0.343994 2.38136L0 3.33136C8.892 0.626361 17.995 0.189361 25.02 1.76236Z" fill="#005161" />
      <path transform="translate(34.29 38.8)" d="M9.55 12.98L9.33 13.58L9.31 13.62C9.05 13.55 8.77 13.51 8.52 13.43C6.35 12.81 4.58 12.01 3.19 11.12C1.82 8.57001 0.75 5.84 0 2.95C0.21 2.44 0.489996 1.9 0.839996 1.34C1.12 0.889996 1.45 0.45 1.83 0C3.51 4.88 6.08 9.21 9.55 12.98Z" fill="#00bcd2" />
      <path transform="translate(37.09 33.84)" d="M8.64999 12.7L7.14 16.86C3.58 13.01 1.17 8.7 0 3.92C1.35 2.58 3.12001 1.26 5.24001 0C4.53001 4.82 5.98999 8.95001 8.64999 12.7Z" fill="#00bcd2" />
      <path transform="translate(52.78 29.19)" d="M9.62145 9.95999C6.82145 10.77 4.16144 11.69 1.70144 12.7C-0.208562 10.04 -0.49857 7.13 0.77143 3.25C0.85143 3.03 1.93143 0 1.93143 0C3.86143 3.59 6.43145 6.89999 9.62145 9.95999Z" fill="#00bcd2" />
      <path transform="translate(56.28 26.56)" d="M14.19 10.65C11.95 11.09 9.78 11.6 7.67 12.16C4.15 8.91 1.58 5.4 0 1.63C2.75 0.850005 5.49999 0.31 8.18999 0C8.58999 3.9 10.82 7.40001 14.19 10.65Z" fill="#00bcd2" />
      <path transform="translate(43.38 31.2)" d="M0.250015 20.7366C0.222015 20.7366 0.193008 20.7316 0.165008 20.7216C0.0350084 20.6746 -0.0319855 20.5316 0.0150145 20.4016L7.34201 0.16461C7.39001 0.0346101 7.53302 -0.0313838 7.66202 0.0146162C7.79202 0.0616162 7.85901 0.205608 7.81201 0.334608L0.485016 20.5716C0.448016 20.6726 0.353015 20.7366 0.250015 20.7366Z" fill="#ffffff" />
      <path transform="translate(81.14 28.13)" d="M4.70718 7.40817C4.60418 7.40817 4.50718 7.34417 4.47119 7.24017C4.40519 7.04817 4.33516 6.85518 4.26516 6.66518C3.99916 5.94918 3.55717 4.84217 2.95217 3.62617C2.30917 2.34117 1.32816 1.24617 0.11416 0.460174C-0.00184005 0.385174 -0.0348147 0.231181 0.0401853 0.114181C0.115185 -0.00181866 0.270163 -0.0348238 0.386163 0.0401762C1.67516 0.875176 2.71717 2.03818 3.40017 3.40318C4.01417 4.63818 4.46419 5.76418 4.73419 6.49118C4.80619 6.68518 4.87618 6.88017 4.94418 7.07617C4.98918 7.20717 4.92019 7.34918 4.79019 7.39418C4.76219 7.40418 4.73418 7.40817 4.70718 7.40817Z" fill="#ffffff" />
      <path transform="translate(65.51 18.84)" d="M0 0.982373C1.553 0.765373 3.1 0.470373 4.664 0.316373C6.23 0.177373 7.79699 0.0273675 9.37299 0.0203675C12.519 -0.0716325 15.683 0.146371 18.788 0.708371C21.889 1.28737 24.933 2.19437 27.822 3.45637C29.262 4.09537 30.674 4.79437 32.055 5.54037C33.439 6.28237 34.785 7.09137 36.224 7.72137C33.301 6.55837 30.582 4.95438 27.672 3.81038C24.778 2.63338 21.774 1.73438 18.698 1.20038C17.166 0.896375 15.613 0.735372 14.06 0.568372C12.5 0.490372 10.941 0.373378 9.37601 0.403378C6.24701 0.361378 3.123 0.662373 0 0.982373Z" fill="#483432" />
      <path transform="translate(93.04 36.51)" d="M0 14.585C3.632 12.904 7.16901 11.023 10.575 8.929C13.991 6.855 17.305 4.60799 20.426 2.11299C22.019 0.842991 24.02 0.1 26.057 0L92.098 0.174988L26.075 0.373001C24.114 0.455001 22.179 1.157 20.631 2.373C14.317 7.322 7.334 11.384 0 14.585Z" fill="#483432" />
      <path transform="translate(78.81 16.28)" d="M0 0.25C4.005 0.044 8.01099 0.03 12.016 0C16.021 0.029 20.027 0.042 24.032 0.25C20.027 0.458 16.021 0.471 12.016 0.5C8.00999 0.47 4.005 0.457 0 0.25Z" fill="#483432" />
      <path transform="translate(46.82 43.27)" d="M0 13.02C5.065 13.924 10.198 14.34 15.324 14.2C20.452 14.074 25.547 13.282 30.519 12.06C35.502 10.858 40.353 9.144 45.053 7.09C49.76 5.045 54.293 2.608 58.723 0C56.553 1.379 54.346 2.69898 52.108 3.97198C49.845 5.19598 47.559 6.38599 45.21 7.44199C40.523 9.57799 35.641 11.299 30.638 12.546C25.626 13.735 20.495 14.539 15.334 14.584C10.175 14.657 5.028 14.104 0 13.02Z" fill="#483432" />
      <path transform="translate(59.08 24.32)" d="M0 2.23077C3.409 1.08877 6.97301 0.393773 10.57 0.129773C14.168 -0.142227 17.793 0.0247706 21.366 0.523771C24.933 1.06277 28.453 1.93577 31.836 3.18077C35.221 4.42077 38.471 6.02277 41.49 7.97477C38.376 6.18077 35.09 4.71077 31.707 3.54277C28.322 2.38177 24.835 1.51377 21.294 1.01777C17.758 0.482774 14.168 0.323777 10.595 0.511777C7.023 0.707777 3.462 1.26477 0 2.23077Z" fill="#483432" />
      <path transform="translate(193.95 49.6)" d="M0 0.25C1.444 0.055 2.888 0.01 4.332 0C5.776 0.009 7.22001 0.054 8.66501 0.25C7.22101 0.446 5.777 0.491 4.332 0.5C2.888 0.49 1.444 0.445 0 0.25Z" fill="#cc3b39" />
      <path transform="translate(198.25 34.91)" d="M16.996 0C15.945 1.326 14.77 2.551 13.515 3.686C12.269 4.833 10.928 5.877 9.51999 6.832C8.81799 7.312 8.07701 7.73601 7.34201 8.16701C6.57201 8.54201 5.82599 8.957 5.01199 9.242C3.42599 9.86 1.698 10.279 0 10.101C1.684 9.884 3.216 9.23701 4.698 8.52701C6.177 7.80201 7.59301 6.938 8.96201 6.002C10.345 5.087 11.686 4.099 13.016 3.089C14.34 2.069 15.673 1.051 16.996 0Z" fill="#ff4340" />
      <path transform="translate(115.46 29.57)" d="M67.68 12.96C65.21 12.14 62.55 11.89 59.89 12.26L0 20.74C9.44 15.18 10.73 9.15999 6.19998 2.78999C6.19998 2.78999 56.58 2.78999 56.88 2.76999C60.65 2.63999 64.26 1.67 67.5 0C65.54 5.59 66.09 9.81999 67.68 12.96Z" fill="#dad0ba" />
      <path transform="translate(33.29 36.09)" d="M71.97 15.6713L66.51 16.4412C52.38 21.1512 28.45 25.9412 13.44 24.2412C13.44 24.2412 13.44 24.2412 13.43 24.2412C7.73001 23.5912 3.01 21.9313 0 19.4213C5.76 21.0913 14.557 19.2692 22.783 12.9162C40.433 -0.714754 31.591 17.5122 54.51 3.05124C69.626 -6.48676 61.13 8.76125 71.97 15.6713Z" fill="#dad0ba" />
      <path transform="translate(73.71 38.29)" d="M2.66789 1.81602C8.43289 -2.08798 11.2209 1.24103 6.75291 3.09303C2.28491 4.94303 -3.46011 5.96402 2.66789 1.81602Z" fill="#dad0ba" />
      <path transform="translate(100.72 40.13)" d="M1.41612 2.14216C4.72212 -1.56884 7.23511 0.247156 4.46711 2.31016C1.69911 4.37316 -2.09788 6.08616 1.41612 2.14216Z" fill="#dad0ba" />
      <path transform="translate(60.91 19.71)" d="M1.8653 1.81505C12.7163 -0.929951 20.4393 -0.418954 27.9713 2.39005C35.5033 5.19805 36.7803 6.22005 30.3973 4.81505C24.0143 3.41105 23.1203 0.538055 13.7383 2.26205C4.35529 3.98505 7.73828 0.666048 2.50428 3.22005C-2.72972 5.77305 1.8653 1.81505 1.8653 1.81505Z" fill="#ff4340" />
      <path transform="translate(106.41 28.29)" d="M1.18093 0.704953C6.03793 -0.847047 6.06393 0.321951 8.36193 2.66795C10.6599 5.01395 6.20794 2.57194 4.48394 1.90194C2.75994 1.23194 -2.26607 1.80595 1.18093 0.704953Z" fill="#ff4340" />
      <path transform="translate(49.21 35.55)" d="M0 8.82701C2.53 7.44701 5.148 6.22101 7.841 5.18001C10.532 4.13101 13.298 3.279 16.094 2.556C18.9 1.87 21.737 1.316 24.594 0.912003C27.45 0.500003 30.321 0.23 33.193 0C30.341 0.414 27.489 0.815007 24.654 1.29201C21.819 1.77401 18.997 2.321 16.216 3.041C13.425 3.72 10.68 4.572 7.97501 5.539C5.27301 6.512 2.613 7.61101 0 8.82701Z" fill="#483432" />
      </svg>
  );
}

function HeliPayload() {
  return (
    // Outer = gentle cruising flight (rise/fall + a subtle bank that suggests heading)
    <div className="heli-float" style={{ animation: "heliCruise 6s ease-in-out infinite", transformOrigin: "50% 0%" }}>
      <div className="heli-vibrate" style={{ animation: "heliVibrate 0.18s linear infinite" }}>
        {/* Flipped horizontally so the nose faces RIGHT — same heading as the CDT
            truck below. scaleX(-1) mirrors it; translateX(-15%) re-centres the
            body/skids over the centred QR (the tail now extends off to the left). */}
        <div className="relative mx-auto w-[212px] max-w-[56vw]" style={{ transform: "translateX(-15%) scaleX(-1)" }}>
          <Helicopter />
        </div>
        {/* Swinging payload — cables + QR pivot from the hook like a pendulum */}
        <div className="qr-swing mx-auto" style={{ animation: "qrSwing 4s ease-in-out infinite", transformOrigin: "50% 0%", width: "fit-content" }}>
          {/* hanging rig + QR as ONE svg so the steel cables thread THROUGH the
              grommet holes in the banner's top corners (realistic suspension) */}
          <svg viewBox="0 0 124 158" className="mx-auto block w-[108px] max-w-[32vw] overflow-visible" aria-hidden="true">
            <defs>
              <filter id="qr-sh" x="-30%" y="-15%" width="160%" height="160%">
                <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
              </filter>
            </defs>
            {/* hook */}
            <circle cx="62" cy="6" r="2.8" fill="#565a5f" />
            {/* white banner */}
            <rect x="8" y="46" width="108" height="106" rx="9" fill="#ffffff" filter="url(#qr-sh)" />
            {/* QR */}
            <image href="/images/qr.svg" x="17" y="55" width="90" height="90" preserveAspectRatio="xMidYMid meet" />
            {/* steel cables (dark core + bright highlight) running into the grommets */}
            <path d="M60 8 L25 50" stroke="#3f4348" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M64 8 L99 50" stroke="#3f4348" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M60 8 L25 50" stroke="#aab0b6" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M64 8 L99 50" stroke="#aab0b6" strokeWidth="0.9" strokeLinecap="round" />
            {/* grommets: metal eyelet + dark hole that swallows the cable end */}
            <circle cx="25" cy="50" r="4.6" fill="#d3d7dc" stroke="#9aa0a6" strokeWidth="0.8" />
            <circle cx="25" cy="50" r="2.3" fill="#1f2225" />
            <circle cx="99" cy="50" r="4.6" fill="#d3d7dc" stroke="#9aa0a6" strokeWidth="0.8" />
            <circle cx="99" cy="50" r="2.3" fill="#1f2225" />
          </svg>
          <p className="mt-2 text-center font-poppins text-xs font-bold uppercase tracking-[0.18em] text-[#7a6f6f]">
            Scan Me
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Vehicles ----------
 * Every vehicle is drawn FACING RIGHT inside a 120-tall viewBox. Wheels sit at
 * y≈98 (r≈14-15) so each tyre bottoms out around y≈112 — leaving a deliberate
 * GAP of empty viewBox below it. A soft contact-shadow sits at y≈113, so the
 * vehicle reads as floating just above the road, exactly like the reference art
 * (clean vector illustration, not a sticker glued to the bottom edge).          */
/* Shared SVG defs (blur filter + metallic gradients). Rendered once inside each
   vehicle's <svg>; duplicate ids across SVGs resolve first-wins (identical), so
   every wheel/shadow gets the same premium treatment. */
function VehicleDefs() {
  return (
    <defs>
      <filter id="vsh" x="-40%" y="-70%" width="180%" height="260%">
        <feGaussianBlur stdDeviation="2.6" />
      </filter>
      <radialGradient id="tyre" cx="40%" cy="35%" r="72%">
        <stop offset="0" stopColor="#2b2d32" /><stop offset="1" stopColor="#101116" />
      </radialGradient>
      <radialGradient id="rim" cx="38%" cy="33%" r="72%">
        <stop offset="0" stopColor="#f6f8fa" /><stop offset="0.55" stopColor="#d2d7dd" /><stop offset="1" stopColor="#959ba3" />
      </radialGradient>
    </defs>
  );
}

// Alloy wheel — dished metallic rim (radial gradient), 5 spokes, hub. NOTE: no
// inline transform-origin — `.spin-wheel` uses transform-box:fill-box +
// transform-origin:center, so each wheel spins around its OWN centre.
function Wheel({ cx, cy, r }) {
  return (
    <g className="spin-wheel">
      {/* tyre + sidewall */}
      <circle cx={cx} cy={cy} r={r} fill="url(#tyre)" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#000" strokeOpacity="0.55" strokeWidth={r * 0.06} />
      <circle cx={cx} cy={cy} r={r * 0.86} fill="none" stroke="#000" strokeOpacity="0.28" strokeWidth={r * 0.12} />
      {/* dished rim */}
      <circle cx={cx} cy={cy} r={r * 0.62} fill="url(#rim)" />
      <circle cx={cx} cy={cy} r={r * 0.62} fill="none" stroke="#878d95" strokeWidth={r * 0.05} />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={cx + Math.cos(a) * r * 0.5}
            y2={cy + Math.sin(a) * r * 0.5}
            stroke="#9097a0" strokeWidth={r * 0.16} strokeLinecap="round" opacity="0.9"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.15} fill="#7c828a" />
      <circle cx={cx} cy={cy} r={r * 0.15} fill="none" stroke="#565b64" strokeWidth={r * 0.04} />
    </g>
  );
}

/* soft BLURRED contact shadow — grounds the vehicle like a real product shot */
function GroundShadow({ cx, w, cy = 114 }) {
  return <ellipse cx={cx} cy={cy} rx={w} ry="4.2" fill="rgba(0,0,0,0.3)" filter="url(#vsh)" />;
}

/* ── Shared modern-car silhouette (faces right) ──────────────────────────────
   Wheels are drawn BEHIND the body; the body's lower edge has two arch cut-outs
   so the tyres seat into the fenders and poke out beneath the sills — a real
   car stance, not a shape with circles glued under it. cx 52 & 158, r 18.      */
const CAR_PATH =
  "M22 98 H32 A22 22 0 0 0 76 98 H138 A22 22 0 0 0 182 98 H190 " +
  "Q199 97 198 87 L196 79 Q193 67 180 63 L150 56 " +
  "Q139 43 120 43 L113 43 Q103 29 84 30 L70 30 Q55 32 49 45 L41 58 " +
  "Q25 62 23 75 Z";

function CarBody({ fill, dark, glass }) {
  return (
    <>
      <Wheel cx={52} cy={95} r={18} />
      <Wheel cx={158} cy={95} r={18} />
      <path d={CAR_PATH} fill={fill} stroke={dark} strokeWidth="1.3" strokeLinejoin="round" />
      {/* top-edge rim light — follows roof → hood, gives the metal a lit edge */}
      <path d="M49 45 Q55 32 70 30 L84 30 Q103 29 113 43 L120 43 Q139 43 150 56 L180 63"
            fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" />
      {/* greenhouse glass + B-pillar + reflection streak */}
      <path d="M114 44 Q104 32 86 32 L70 32 Q55 33 50 45 Z" fill={glass} />
      <rect x="82" y="32" width="5" height="13" fill={dark} opacity="0.8" />
      <path d="M68 33 L57 45 L64 45 L78 33 Z" fill="#fff" opacity="0.35" />
      {/* belt-line chrome */}
      <path d="M50 46 H114" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.4" />
      {/* glossy diagonal light sweep across the body */}
      <path d="M40 70 L150 52 L162 56 L52 76 Z" fill="#fff" opacity="0.12" />
      {/* lower ambient-occlusion band (darker toward the sills) */}
      <path d="M30 84 Q105 80 190 86 L190 92 Q105 88 30 92 Z" fill="#000" opacity="0.1" />
      {/* door split + handles */}
      <path d="M86 47 V92" stroke="#000" strokeOpacity="0.16" strokeWidth="1.3" />
      <rect x="70" y="55" width="9" height="3" rx="1.5" fill="#000" opacity="0.3" />
      <rect x="96" y="55" width="9" height="3" rx="1.5" fill="#000" opacity="0.3" />
      {/* sill + arch contact shadows for depth */}
      <path d="M32 95 H188" stroke="#000" strokeOpacity="0.16" strokeWidth="3" />
      <path d="M32 96 A22 22 0 0 1 76 96" fill="none" stroke="#000" strokeOpacity="0.22" strokeWidth="2.5" />
      <path d="M138 96 A22 22 0 0 1 182 96" fill="none" stroke="#000" strokeOpacity="0.22" strokeWidth="2.5" />
      {/* headlight lens (front) + taillight lens (rear) */}
      <path d="M184 63 Q196 64 197 73 L184 73 Z" fill="#fff7d6" />
      <path d="M188 65 Q195 66 196 72 L188 72 Z" fill="#fff" opacity="0.95" />
      <path d="M22 65 Q24 64 28 64 L28 73 Q24 73 22 72 Z" fill="#ff5a4d" />
      <rect x="24" y="66" width="3.5" height="5" rx="1.5" fill="#ffd2cc" opacity="0.7" />
    </>
  );
}

/* CDT box truck — the hero vehicle. Built from the supplied truck template
   (white cab + cyan windshield, white box with panel lines, chassis + under-body
   boxes). The body is drawn facing LEFT like the template, then mirrored to face
   RIGHT (its travel direction); the CDT crest replaces the placeholder text and
   the static tyres are swapped for our spinning <Wheel>s. viewBox 800×320. */
function Truck() {
  return (
    <svg viewBox="0 0 800 295" className="block w-full h-auto overflow-visible" aria-hidden="true">
      <VehicleDefs />

      {/* soft blurred ground shadow (cropped viewBox seats the wheels near the
          bottom so the truck sits ON the road, not floating above it) */}
      <ellipse cx="400" cy="290" rx="350" ry="12" fill="rgba(0,0,0,0.26)" filter="url(#vsh)" />

      {/* whole body mirrored so the cab faces RIGHT (direction of travel) */}
      <g transform="translate(800,0) scale(-1,1)">
        {/* chassis + under-body boxes */}
        <rect x="190" y="235" width="550" height="18" fill="#333333" />
        <rect x="360" y="253" width="90" height="25" rx="4" fill="#7a7a7a" />
        <rect x="470" y="253" width="40" height="15" rx="2" fill="#555555" />
        {/* rear bumper + tail light */}
        <rect x="740" y="225" width="12" height="35" rx="2" fill="#222222" />
        <rect x="746" y="235" width="6" height="12" fill="#ff2a2a" />
        {/* cab body */}
        <path d="M 80,250 L 80,140 Q 80,85 130,75 L 230,75 L 230,250 Z" fill="#ffffff" stroke="#1a1a1a" strokeWidth="3.5" strokeLinejoin="round" />
        {/* windshield */}
        <path d="M 95,150 Q 95,100 135,90 L 190,90 L 190,150 Z" fill="#cce0ff" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" />
        {/* door line + handle */}
        <line x1="190" y1="150" x2="190" y2="250" stroke="#1a1a1a" strokeWidth="2.5" />
        <rect x="165" y="160" width="18" height="6" rx="3" fill="#1a1a1a" />
        {/* front step + indicator */}
        <path d="M 68,230 L 80,230 L 80,260 L 75,260 Q 68,260 68,255 Z" fill="#444444" />
        <rect x="75" y="200" width="6" height="20" rx="2" fill="#ffcc00" />
        {/* cargo box */}
        <rect x="230" y="45" width="510" height="190" fill="#ffffff" stroke="#1a1a1a" strokeWidth="3.5" strokeLinejoin="round" />
        <rect x="230" y="45" width="510" height="6" fill="#e6e6e6" />
        <rect x="230" y="229" width="510" height="6" fill="#e6e6e6" />
        <line x1="230" y1="45" x2="230" y2="235" stroke="#cccccc" strokeWidth="2" />
        <line x1="740" y1="45" x2="740" y2="235" stroke="#cccccc" strokeWidth="2" />
      </g>

      {/* CDT crest — drawn un-mirrored, centred on the (mirrored) box */}
      <image href="/images/cdt-logo.svg" x="205" y="78" width="220" height="124" preserveAspectRatio="xMidYMid meet" />

      {/* spinning wheels at the mirrored axle positions — the tyres jitter
          (engine/road buzz) while the truck body stays steady */}
      <g className="tyre-vibrate">
        <Wheel cx={655} cy={255} r={32} />
        <Wheel cx={215} cy={255} r={32} />
        <Wheel cx={135} cy={255} r={32} />
      </g>
    </svg>
  );
}

/* Compact city taxi — built from the supplied chunky taxi template (roof sign,
   yellow body, checker stripe, twin windows). Static tyres swapped for our
   spinning <Wheel>s. Rendered SMALL via its lane width. Front-symmetric, so the
   lane's mirror flip leaves it unchanged. viewBox cropped to seat the wheels. */
function Taxi() {
  return (
    <svg viewBox="0 22 120 86" className="block w-full h-auto overflow-visible" aria-hidden="true">
      <VehicleDefs />
      <GroundShadow cx={60} w={42} cy={104} />
      {/* roof TAXI sign */}
      <path d="M 45 35 C 45 32 47 30 50 30 L 70 30 C 73 30 75 32 75 35 L 75 40 L 45 40 Z" fill="#E67E22" />
      <rect x="48" y="33" width="24" height="4" rx="1" fill="#FFFFFF" />
      {/* cabin dome */}
      <path d="M 32 60 C 32 45 42 40 60 40 C 78 40 88 45 88 60 Z" fill="#F1C40F" />
      {/* windows + glass tint */}
      <path d="M 37 60 L 37 50 C 37 46 45 44 58 44 L 58 60 Z" fill="#2C3E50" />
      <path d="M 62 60 L 62 44 C 75 44 83 46 83 50 L 83 60 Z" fill="#2C3E50" />
      <path d="M 40 58 L 40 52 C 40 49 46 47 55 47 L 55 58 Z" fill="#85C1E9" opacity="0.25" />
      <path d="M 65 58 L 65 47 C 74 47 80 49 80 52 L 80 58 Z" fill="#85C1E9" opacity="0.25" />
      {/* lower body */}
      <path d="M 12 85 C 12 65 25 60 35 60 L 85 60 C 95 60 108 65 108 85 C 108 88 106 90 103 90 L 17 90 C 14 90 12 88 12 85 Z" fill="#F1C40F" />
      {/* checker stripe */}
      <line x1="12" y1="68" x2="108" y2="68" stroke="#2C3E50" strokeWidth="4" />
      <line x1="14" y1="68" x2="108" y2="68" stroke="#F1C40F" strokeWidth="4" strokeDasharray="6 6" />
      {/* door split + handles */}
      <line x1="60" y1="60" x2="60" y2="90" stroke="#D4AC0D" strokeWidth="1.5" />
      <rect x="45" y="74" width="8" height="2.5" rx="1.25" fill="#D4AC0D" />
      <rect x="67" y="74" width="8" height="2.5" rx="1.25" fill="#D4AC0D" />
      {/* tail/head markers + mirrors */}
      <rect x="11" y="76" width="5" height="8" rx="2" fill="#E74C3C" />
      <rect x="104" y="76" width="5" height="8" rx="2" fill="#FFFFFF" />
      <rect x="8" y="86" width="12" height="6" rx="3" fill="#BDC3C7" />
      <rect x="100" y="86" width="12" height="6" rx="3" fill="#BDC3C7" />
      {/* spinning wheels */}
      <Wheel cx={32} cy={90} r={14} />
      <Wheel cx={88} cy={90} r={14} />
    </svg>
  );
}

/* Sleek sports car — from the supplied template (low black body, dark cabin
   glass, head/tail lights). Static tyres swapped for our spinning <Wheel>s.
   viewBox cropped so the wheels seat on the road. Faces right (flipped left in
   the oncoming lane). */
function Sedan() {
  return (
    <svg viewBox="0 70 800 186" className="block w-full h-auto overflow-visible" aria-hidden="true">
      <VehicleDefs />
      <ellipse cx="400" cy="250" rx="290" ry="9" fill="rgba(0,0,0,0.2)" filter="url(#vsh)" />
      {/* body */}
      <path d="M 110 210 C 90 210, 85 190, 90 170 C 95 150, 140 140, 180 135 C 240 125, 300 75, 420 75 L 480 75 C 580 75, 640 120, 680 135 C 730 145, 770 160, 765 185 C 760 210, 740 210, 710 210 Z" fill="#141414" />
      {/* cabin glass + B-pillar */}
      <path d="M 230 135 C 280 85, 380 85, 480 85 C 550 85, 610 120, 640 135 Z" fill="#2c3e50" stroke="#e0e0e0" strokeWidth="2" strokeLinejoin="round" />
      <line x1="450" y1="85" x2="450" y2="135" stroke="#141414" strokeWidth="14" />
      {/* tail (red) + head (white) lights */}
      <path d="M 90 170 C 105 165, 120 160, 120 155 L 93 155 C 91 160, 90 165, 90 170 Z" fill="#e74c3c" />
      <path d="M 764 180 C 750 175, 735 170, 730 165 L 758 165 C 762 170, 764 175, 764 180 Z" fill="#ecf0f1" />
      {/* side trim */}
      <line x1="180" y1="205" x2="680" y2="205" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" />
      {/* spinning wheels */}
      <Wheel cx={210} cy={210} r={38} />
      <Wheel cx={630} cy={210} r={38} />
    </svg>
  );
}

/* Tempo / delivery mini-truck — from the supplied template (blue corrugated
   cargo box + white cab). Static tyres swapped for our spinning <Wheel>s.
   viewBox cropped so the wheels seat on the road. Faces right. */
function Van() {
  return (
    <svg viewBox="0 70 600 179" className="block w-full h-auto overflow-visible" aria-hidden="true">
      <VehicleDefs />
      <ellipse cx="300" cy="246" rx="225" ry="8" fill="rgba(0,0,0,0.2)" filter="url(#vsh)" />
      {/* chassis */}
      <rect x="110" y="210" width="360" height="12" rx="4" fill="#34495e" />
      {/* blue cargo box + corrugations */}
      <rect x="120" y="140" width="160" height="70" rx="2" fill="#3498db" />
      <rect x="115" y="135" width="170" height="8" rx="2" fill="#2980b9" />
      <line x1="140" y1="150" x2="140" y2="200" stroke="#2980b9" strokeWidth="3" strokeLinecap="round" />
      <line x1="180" y1="150" x2="180" y2="200" stroke="#2980b9" strokeWidth="3" strokeLinecap="round" />
      <line x1="220" y1="150" x2="220" y2="200" stroke="#2980b9" strokeWidth="3" strokeLinecap="round" />
      <line x1="260" y1="150" x2="260" y2="200" stroke="#2980b9" strokeWidth="3" strokeLinecap="round" />
      {/* white cab */}
      <path d="M 280 210 L 280 90 C 280 80, 285 75, 295 75 L 370 75 C 395 75, 410 95, 420 110 L 460 165 C 470 180, 470 200, 465 210 Z" fill="#ffffff" />
      {/* windshield + glass tint */}
      <path d="M 295 90 L 365 90 C 380 90, 395 105, 405 120 L 430 155 L 295 155 Z" fill="#2c3e50" />
      <path d="M 310 155 L 330 90 L 350 90 L 330 155 Z" fill="#85c1e9" opacity="0.2" />
      {/* door outline + handle */}
      <path d="M 280 210 L 280 155 L 435 155 C 440 170, 440 190, 435 210 Z" stroke="#bdc3c7" strokeWidth="2" fill="none" />
      <rect x="300" y="165" width="14" height="4" rx="2" fill="#95a5a6" />
      {/* indicator + tail light + mirrors */}
      <path d="M 456 165 L 466 170 L 464 185 L 452 180 Z" fill="#f1c40f" />
      <rect x="110" y="185" width="6" height="16" rx="2" fill="#e74c3c" />
      <rect x="450" y="195" width="20" height="15" rx="4" fill="#7f8c8d" />
      <rect x="105" y="195" width="15" height="15" rx="4" fill="#7f8c8d" />
      {/* spinning wheels */}
      <Wheel cx={170} cy={215} r={26} />
      <Wheel cx={390} cy={215} r={26} />
    </svg>
  );
}

function Vehicle({ t, color, dark, light }) {
  if (t === "taxi") return <Taxi />;
  if (t === "car") return <Sedan color={color} dark={dark} light={light} />;
  if (t === "van") return <Van color={color} dark={dark} light={light} />;
  return <Truck />;
}

/* TWO lanes / two tracks: the CDT truck cruises the FAR (upper) lane going →,
   while a car, a taxi and a van run the NEAR (lower) lane going ←. The near lane
   sits lower and renders in FRONT of the truck, so the road reads with depth. */
const ONCOMING = [
  { t: "car", w: "clamp(200px,24vw,308px)", dur: 20, delay: -1 },
  { t: "taxi", w: "clamp(86px,11vw,140px)", dur: 20, delay: -8 },
  { t: "van", w: "clamp(178px,21vw,275px)", dur: 20, delay: -14.5 },
];

export default function Contact() {
  return (
    <section id="contact" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink-3 pt-16 lg:h-[100svh] lg:pt-20">
      {/* ── Figma "Group 10" glow — biased to the top-centre ── */}
      <Glow side="center" rotate={270} place="left-1/2 top-[0%] -translate-x-1/2 -translate-y-1/2 w-[clamp(720px,72vw,1500px)]" />
      {/* one continuous ambient wash centred high (top) so the warm glow sits behind
          the heading/helicopter and fades down toward the skyline */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(130% 80% at 50% 16%, rgba(152,122,52,0.22) 0%, rgba(22,44,86,0.14) 44%, transparent 78%)" }}
      />

      {/* heading + contact info */}
      <div className="container-site relative z-[1] shrink-0">
        <Reveal>
          <h2 className="text-center font-gotham text-[clamp(32px,7vw,82px)] font-bold uppercase leading-[0.95] tracking-tight text-white">
            Get it Now!
          </h2>
        </Reveal>

        {/* info row */}
        <Reveal delay={120} className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:mt-7 lg:mt-9 lg:gap-x-10">
          {INFO.map((it, i) => {
            const inner = (
              <span className="flex items-center gap-3 text-left">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#FFE0E0] text-brand">
                  <it.icon className="h-4 w-4" />
                </span>
                <span className="font-poppins text-[13px] leading-snug text-cream sm:text-sm">
                  {it.lines.map((l, j) => (
                    <span key={j} className="block">{l}</span>
                  ))}
                </span>
              </span>
            );
            return it.href ? (
              <a key={i} href={it.href} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-80">{inner}</a>
            ) : (
              <span key={i}>{inner}</span>
            );
          })}
        </Reveal>
      </div>

      {/* helicopter + QR — on large screens it fills the middle and is pushed to the
          BOTTOM of its area (hovers just above the skyline); on mobile it keeps its
          natural height so nothing overlaps and the section grows/scrolls. */}
      <div className="container-site relative z-[1] flex items-center justify-center py-7 sm:py-9 lg:min-h-0 lg:flex-1 lg:items-end lg:py-0 lg:pb-[1vh]">
        <HeliPayload />
      </div>

      {/* ── City scene — fully transparent so the section's one continuous ambient
          wash flows straight through (the skyline merges with the area above, no
          seam). Big ZOOMED skyline: `max-w-none` keeps the panorama at true width
          so ONE colour-section ≈ fills the screen; vehicles ride the artwork road. ── */}
      <div className="relative w-full shrink-0 overflow-hidden">
        <div className="relative h-[max(210px,min(44vw,44vh,540px))] w-full overflow-hidden">
          {/* zoomed skyline marquee — max-w-none keeps the image at true scale */}
          <div className="marquee-track absolute bottom-0 left-0 flex h-full" style={{ animation: "marqueeX 120s linear infinite" }}>
            <img src="/images/Contact%20Background.png" alt="" className="h-full w-auto max-w-none shrink-0" />
            <img src="/images/Contact%20Background.png" alt="" className="h-full w-auto max-w-none shrink-0 -scale-x-100" />
            <img src="/images/Contact%20Background.png" alt="" className="h-full w-auto max-w-none shrink-0" />
            <img src="/images/Contact%20Background.png" alt="" className="h-full w-auto max-w-none shrink-0 -scale-x-100" />
          </div>

          {/* BACK lane (upper) — car, taxi & van run LEFT, set higher up and
              BEHIND the CDT truck */}
          {ONCOMING.map((v, i) => (
            <div
              key={`onc-${i}`}
              className="drive-lane absolute left-0 z-[4]"
              style={{ bottom: "6%", width: v.w, animation: `driveLeft ${v.dur}s linear ${v.delay}s infinite` }}
            >
              <div style={{ transform: "scaleX(-1)" }}>
                <Vehicle t={v.t} color={v.color} dark={v.dark} light={v.light} />
              </div>
            </div>
          ))}

          {/* FRONT lane (lower) — the CDT truck cruises RIGHT, grounded on the
              white road and IN FRONT of the upper lane (opposite direction). */}
          <div
            className="absolute bottom-[1%] left-1/2 z-[6] -translate-x-1/2"
            style={{ width: "clamp(240px,31vw,380px)" }}
          >
            <Truck />
          </div>
        </div>
      </div>
    </section>
  );
}
