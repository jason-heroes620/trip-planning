export default function ApplicationLogo({ size }) {
    return (
        // <svg {...props} viewBox="0 0 316 316" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M305.8 81.125C305.77 80.995 305.69 80.885 305.65 80.755C305.56 80.525 305.49 80.285 305.37 80.075C305.29 79.935 305.17 79.815 305.07 79.685C304.94 79.515 304.83 79.325 304.68 79.175C304.55 79.045 304.39 78.955 304.25 78.845C304.09 78.715 303.95 78.575 303.77 78.475L251.32 48.275C249.97 47.495 248.31 47.495 246.96 48.275L194.51 78.475C194.33 78.575 194.19 78.725 194.03 78.845C193.89 78.955 193.73 79.045 193.6 79.175C193.45 79.325 193.34 79.515 193.21 79.685C193.11 79.815 192.99 79.935 192.91 80.075C192.79 80.285 192.71 80.525 192.63 80.755C192.58 80.875 192.51 80.995 192.48 81.125C192.38 81.495 192.33 81.875 192.33 82.265V139.625L148.62 164.795V52.575C148.62 52.185 148.57 51.805 148.47 51.435C148.44 51.305 148.36 51.195 148.32 51.065C148.23 50.835 148.16 50.595 148.04 50.385C147.96 50.245 147.84 50.125 147.74 49.995C147.61 49.825 147.5 49.635 147.35 49.485C147.22 49.355 147.06 49.265 146.92 49.155C146.76 49.025 146.62 48.885 146.44 48.785L93.99 18.585C92.64 17.805 90.98 17.805 89.63 18.585L37.18 48.785C37 48.885 36.86 49.035 36.7 49.155C36.56 49.265 36.4 49.355 36.27 49.485C36.12 49.635 36.01 49.825 35.88 49.995C35.78 50.125 35.66 50.245 35.58 50.385C35.46 50.595 35.38 50.835 35.3 51.065C35.25 51.185 35.18 51.305 35.15 51.435C35.05 51.805 35 52.185 35 52.575V232.235C35 233.795 35.84 235.245 37.19 236.025L142.1 296.425C142.33 296.555 142.58 296.635 142.82 296.725C142.93 296.765 143.04 296.835 143.16 296.865C143.53 296.965 143.9 297.015 144.28 297.015C144.66 297.015 145.03 296.965 145.4 296.865C145.5 296.835 145.59 296.775 145.69 296.745C145.95 296.655 146.21 296.565 146.45 296.435L251.36 236.035C252.72 235.255 253.55 233.815 253.55 232.245V174.885L303.81 145.945C305.17 145.165 306 143.725 306 142.155V82.265C305.95 81.875 305.89 81.495 305.8 81.125ZM144.2 227.205L100.57 202.515L146.39 176.135L196.66 147.195L240.33 172.335L208.29 190.625L144.2 227.205ZM244.75 114.995V164.795L226.39 154.225L201.03 139.625V89.825L219.39 100.395L244.75 114.995ZM249.12 57.105L292.81 82.265L249.12 107.425L205.43 82.265L249.12 57.105ZM114.49 184.425L96.13 194.995V85.305L121.49 70.705L139.85 60.135V169.815L114.49 184.425ZM91.76 27.425L135.45 52.585L91.76 77.745L48.07 52.585L91.76 27.425ZM43.67 60.135L62.03 70.705L87.39 85.305V202.545V202.555V202.565C87.39 202.735 87.44 202.895 87.46 203.055C87.49 203.265 87.49 203.485 87.55 203.695V203.705C87.6 203.875 87.69 204.035 87.76 204.195C87.84 204.375 87.89 204.575 87.99 204.745C87.99 204.745 87.99 204.755 88 204.755C88.09 204.905 88.22 205.035 88.33 205.175C88.45 205.335 88.55 205.495 88.69 205.635L88.7 205.645C88.82 205.765 88.98 205.855 89.12 205.965C89.28 206.085 89.42 206.225 89.59 206.325C89.6 206.325 89.6 206.325 89.61 206.335C89.62 206.335 89.62 206.345 89.63 206.345L139.87 234.775V285.065L43.67 229.705V60.135ZM244.75 229.705L148.58 285.075V234.775L219.8 194.115L244.75 179.875V229.705ZM297.2 139.625L253.49 164.795V114.995L278.85 100.395L297.21 89.825V139.625H297.2Z" />
        // </svg>
        <svg
            version="1.1"
            viewBox="0 0 2048 591"
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                transform="translate(228)"
                d="m0 0h8l9 4 5 6 3 9-2 11-14 24-15 26-14 24-15 26-14 24-15 26-14 24-2 3 21-3 10-1h27l23 3 20 5 22 8 21 11 16 11 11 9 5 10v9l-5 10-8 6-3 1h-11l-10-5-9-8-15-10-21-10-15-5-15-3-11-1h-19l-20 3-17 5-18 8-16 10-11 9-10 9-9 11-10 14-10 19-6 16-5 20-2 17v23l3 21 6 21 7 17 9 16 10 13 9 10 9 9 15 11 16 9 20 8 18 4 7 1h31l21-4 17-6 16-8 11-7 9-7 10-9 7-7 10-13 8-13 10-21 6-20 3-17 1-10 1-27 3-21 5-19 6-17 9-19 10-16 9-12 9-10 7-8 11-10 16-12 19-11 17-8 21-7 26-5 11-1h26l24 3 8 2-16-28-15-26-14-24-15-26-14-24-15-26-14-24-2-6v-7l3-8 8-7 5-2h8l8 3 7 8 30 52 14 24 15 26 14 24 15 26 14 24 15 26 11 19-1-5-16-56-28-97-1-9 3-9 5-6 6-3h14l6 4 5 6 5 15 27 94 18 62 1 3 1-134 4-8 7-6 7-2 9 1 7 4 5 6 2 9v297l-1 19-4 24-3 10-4 6-9 5-4 1h-10l-10-4-7-8-2-6 1-9 4-21v-37l-4-22-7-21-10-20-12-17-11-12-9-9-14-10-13-8-19-8-19-5-18-2h-19l-19 3-20 6-19 9-15 10-14 12-7 7-13 17-10 17-7 17-5 16-3 15-1 9-1 26-3 25-6 23-6 16-9 19-11 17-10 13-12 13-7 7-14 11-13 9-18 10-19 8-25 7-20 3-22 1-25-2-20-4-20-6-20-9-16-9-19-14-15-14-12-13-13-18-10-18-8-18-6-19-4-19-2-16v-314l4-8 7-6 7-2 9 1 7 4 6 8 1 5v135l20-69 30-104 3-6 8-7 2-1h14l8 5 4 6 1 3v12l-15 52-19 66-12 42 16-28 28-48 15-26 14-24 30-52 14-24 13-22 5-5z"
                fill="#F06F40"
            />
            <path
                transform="translate(838,116)"
                d="m0 0h17l10 4 6 7 1 3 1 147 8-11 10-9 14-8 11-3 6-1h18l14 3 12 5 12 8 11 10 11 15 8 17 4 15 1 7v133l-4 6-7 4-6 2h-16l-9-4-6-5-2-6v-119l-2-12-7-14-9-10-9-6-13-4h-13l-13 4-11 8-7 9-5 11-1 5-1 128-3 6-7 6-8 3h-16l-10-5-5-5-1-3v-330l6-7z"
                fill="#F06F40"
            />
            <path
                transform="translate(1752,245)"
                d="m0 0h21l18 3 16 6 15 9 12 11 7 8 9 15 5 16 2 15v10l-3 16-4 8-7 6-9 3-6 1-112 1v19l4 13 7 10 8 7 14 7 11 3 7 1h17l15-3 26-13 4-1h8l7 4 6 8 2 6v8l-5 8-10 9-19 9-15 4-16 2h-27l-19-3-16-5-16-8-9-6-10-9-7-7-9-14-6-15-3-17v-62l3-16 6-15 8-12 9-11 13-11 15-9 13-5zm2 38-13 4-10 6-9 9-5 10-2 7v22l60 1h19l11-2 4-5 1-4-1-13-4-11-6-9-9-8-11-5-8-2z"
                fill="#F06F40"
            />
            <path
                transform="translate(1141,245)"
                d="m0 0h21l17 3 16 6 11 6 10 8 6 5 10 13 8 15 4 15 1 7v19l-3 13-5 8-6 5-8 3-6 1-26 1h-19l-46-1-6-4-4-6-1-6 3-8 7-6 4-1h54l10-2 3-3 1-3v-12l-4-13-7-11-8-6-10-5-9-2h-17l-13 4-11 7-7 8-5 10-1 3-1 15v57l2 11 6 12 4 5 11 8 10 5 11 3 7 1h18l14-3 19-9 8-4 3-1h8l6 3 7 8 3 9-1 7-6 9-12 9-16 7-15 4-15 2h-27l-19-3-17-5-16-8-14-10-10-10-7-10-8-16-4-17-1-15v-42l2-20 5-16 8-14 8-10 10-10 14-10 17-8 16-4z"
                fill="#F06F40"
            />
            <path
                transform="translate(1501,250)"
                d="m0 0h11l8 4 7 8 2 6v9l-4 9-7 6-10 6-8 7-7 11-4 10-1 5v57l4 13 6 10 7 8 10 6 7 3 5 1h14l10-3 9-5 9-8 7-11 4-11v-63l-4-11-7-11-9-8-11-7-6-7-2-6v-9l3-8 4-5 6-4 3-1h13l16 8 10 7 10 9 8 9 8 13 5 11 4 17v67l-4 17-8 16-7 11-12 13-15 11-16 8-13 4-12 2h-21l-15-3-13-5-13-7-13-10-10-10-10-14-7-15-4-15-1-8v-57l3-17 6-15 8-13 9-11 10-9 16-10z"
                fill="#F06F40"
            />
            <path
                transform="translate(1958,245)"
                d="m0 0h25l20 3 17 5 13 7 5 5 3 5-1 9-6 12-6 5-3 1h-7l-12-5-16-6-13-2h-12l-10 2-12 6-5 6-3 6-1 9 3 8 5 5 14 7 42 12 18 8 11 8 9 9 7 12 3 11 1 7v17l-4 16-5 10-8 10-10 8-14 7-15 4-14 2h-27l-19-3-16-5-16-8-10-8-4-6-1-3v-10l4-9 4-5 6-3 9 1 18 11 10 5 11 3 9 1h16l16-3 9-6 5-8 1-4v-8l-3-9-5-5-9-6-15-6-37-11-19-9-10-8-7-8-5-10-3-16v-10l2-12 5-13 5-9 9-10 10-8 13-6 16-4z"
                fill="#F06F40"
            />
            <path
                transform="translate(1383,245)"
                d="m0 0h27l6 3 5 5 4 8v11l-4 9-8 7-3 1-26 1-13 4-10 6-10 9-7 11-5 11-3 13-1 15-1 99-7 8-10 4h-16l-9-4-7-8v-199l6-7 10-4h15l8 3 5 4 3 7 1 19 6-9 9-10 11-8 12-6z"
                fill="#F06F40"
            />
            <path
                transform="translate(645,479)"
                d="m0 0h7l10 4 6 7 3 7v10l-5 10-11 13-18 18-17 13-19 11-18 8-20 6-19 3-19 1-23-2-19-4-17-6-21-10-18-12-13-11-12-11-5-8-1-3v-10l4-9 8-7 5-2h11l7 3 8 7 12 11 15 10 15 8 18 6 17 3h22l17-3 18-6 19-10 13-10 10-9 7-7 10-13 6-4z"
                fill="#F06F40"
            />
            <path
                transform="translate(189,349)"
                d="m0 0h8l13 3 8 4 10 8 7 10 4 10 1 5v15l-4 13-6 9-5 6-11 7-12 4-12 1-14-3-11-6-6-5-8-11-4-10-1-5v-15l4-13 7-11 9-8 10-5 6-2z"
                fill="#F06F40"
            />
            <path
                transform="translate(528,349)"
                d="m0 0 16 1 13 4 11 6 10 9 6 7 8 16v9l-4 6-5 4-2 1h-10l-6-4-10-16-7-6-10-4h-12l-10 4-8 7-7 13-6 5-2 1h-10l-6-4-4-5-1-3v-7l5-12 8-11 7-7 11-7 13-5z"
                fill="#F06F40"
            />
        </svg>
    );
}
