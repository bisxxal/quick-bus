// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//     rules: {
//       "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
//     },
//   },
  
// ];

// export default eslintConfig;


import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Get the current filename and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Instantiate FlatCompat with the current directory
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extend configurations and add custom rules
const eslintConfig = [
  // Extend the Next.js core Web Vitals and TypeScript configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add custom rule modifications here
  {
    rules: {
      // Allow unused variables with names starting with an underscore
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];

export default eslintConfig;
