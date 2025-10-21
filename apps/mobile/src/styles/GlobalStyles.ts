import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    overflow-x: hidden;
    width: 100%;
    max-width: 100%;
  }

  #root {
    height: 100vh;
    width: 100%;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  /* Main content takes remaining space */
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;
    width: 100%;
  }

  /* Page Layout */
  .page {
    display: flex;
    flex-direction: column;
    flex: 1;
    
    width: 100%;
    max-width: 100%;
  }

  .page-centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    max-width: 100%;
  }

  /* Flex utilities */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .flex-row { flex-direction: row; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .flex-1 { flex: 1; }

  /* Mobile-specific overrides */
  img, video, canvas {
    max-width: 100%;
    height: auto;
  }

  /* Prevent text from causing horizontal overflow */
  * {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* Safe area handling for mobile */
  @supports (padding: max(0px)) {
    .safe-top {
      padding-top: max(1rem, env(safe-area-inset-top));
    }
    
    .safe-bottom .navigation {
      padding-bottom: max(0px, env(safe-area-inset-bottom));
    }
  }
`;

export default GlobalStyles;
