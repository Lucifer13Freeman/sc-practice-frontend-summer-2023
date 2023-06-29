module.exports = {
  root: true,
  ignorePatterns: [
    "projects/**/*"
  ],
  overrides: [
    {
      files: [
        "*.ts"
      ],
      parserOptions: {
        project: [
          "tsconfig.json"
        ],
        createDefaultProgram: true
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:@ngrx/recommended",
        "plugin:prettier/recommended",
        "prettier",
      ],
      rules: {
        "@angular-eslint/directive-selector": [
          "error",
          {
            type: "attribute",
            prefix: "app",
            style: "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            type: "element",
            prefix: "app",
            style: "kebab-case"
          }
        ],
        "@typescript-eslint/naming-convention": [
          "warn",
          {
            selector: "interface",
            format: [
              "PascalCase"
            ],
            custom: {
              regex: "^I[A-Z]",
              match: true
            }
          },
          // {
          //   selector: "default",
          //   format: [
          //     "strictCamelCase",
          //   ]
          // },
          {
            selector: "variable",
            format: [
              "strictCamelCase",
              "PascalCase",
              "UPPER_CASE"
            ]
          },
          // {
          //   selector: "property",
          //   format: [
          //     "strictCamelCase",
          //     "PascalCase",
          //     "UPPER_CASE"
          //   ],
          //   leadingUnderscore: "allow"
          // },
          {
            selector: "parameter",
            format: [
              "strictCamelCase"
            ],
            leadingUnderscore: "allow"
          },
          {
            selector: "memberLike",
            modifiers: [
              "private"
            ],
            format: [
              "strictCamelCase"
            ],
            leadingUnderscore: "allow"
          },
          {
            selector: "typeLike",
            format: [
              "PascalCase"
            ]
          },
          {
            selector: "enumMember",
            format: [
              "UPPER_CASE"
            ]
          }
        ],
        "@angular-eslint/no-empty-lifecycle-method": "warn",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-empty-function": "warn",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": "off"
      }
    },
    {
      files: [
        "*.html"
      ],
      extends: [
        "plugin:@angular-eslint/template/recommended"
      ],
      rules: {}
    }
  ]
}
