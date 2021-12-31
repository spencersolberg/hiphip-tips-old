export const style = `
    @font-face {
        font-family: "Fluro Bold";
        src: url("/static/FluroBold.woff") format("woff");
        font-weight: normal;
        font-style: normal;
    }
    h1, button, span, h2, input {
    font-family: "Fluro Bold";
    }
    @media (prefers-color-scheme: dark) {
        body {
            background-color: black;
        }
    }
    p {
        font-family: "Courier New";
    }

    * {
        box-sizing: content-box !important;
    }
`;