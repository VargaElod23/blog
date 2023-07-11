import "prismjs/themes/prism.css"; // Import the Prism.js CSS file
import "prismjs/components/prism-markup"; // Import the desired language components

// Add additional language imports as needed
// For example, import 'prismjs/components/prism-javascript' for JavaScript syntax highlighting

// Export Prism object for further customization
export default typeof window !== "undefined" ? window.Prism : null;
