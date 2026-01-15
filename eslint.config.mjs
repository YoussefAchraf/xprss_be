import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import boundaries from "eslint-plugin-boundaries";

export default [
  js.configs.recommended,

  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module"
      },
      globals: {
        process: "readonly",
        console: "readonly"
      }
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      boundaries
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
        }
      },
      "boundaries/elements": [
        { type: "domain", pattern: "src/domain/**" },
        { type: "use-cases", pattern: "src/use-cases/**" },
        { type: "infrastructure", pattern: "src/infrastructure/**" },
        { type: "interface", pattern: "src/interface/**" }
      ]
    },

    rules: {
      ...tsPlugin.configs.recommended.rules,

      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",

      "import/no-cycle": "error",
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ],

      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "domain", allow: ["domain"] },
            { from: "use-cases", allow: ["domain", "use-cases"] },
            { from: "infrastructure", allow: ["domain", "use-cases"] },
            {
              from: "interface",
              allow: ["domain", "use-cases", "infrastructure"]
            }
          ]
        }
      ]
    }
  }
];
