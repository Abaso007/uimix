import React from "react";
import ReactDOM from "react-dom/client";
import { Button } from "./stories/Button";
import { Header } from "./stories/Header";

// TODO: share type with ForeignComponentManager

type Type =
  | {
      type: "string";
    }
  | {
      type: "boolean";
    }
  | {
      type: "enum";
      values: string[];
    };

interface Prop {
  name: string;
  type: Type;
}

interface ForeignComponent {
  path: string; // path relative to project root e.g. "src/Button.tsx"
  name: string; // export name; e.g. "Button" ("default" for default export)
  props: Prop[];
  component: React.ElementType;
}

export const components: ForeignComponent[] = [
  {
    path: "src/stories/Button.tsx",
    name: "Button",
    props: [
      {
        name: "primary",
        type: { type: "boolean" },
      },
      {
        name: "backgroundColor",
        type: { type: "string" },
      },
      {
        name: "size",
        type: {
          type: "enum",
          values: ["small", "medium", "large"],
        },
      },
      {
        name: "label",
        type: { type: "string" },
      },
    ],
    component: Button,
  },
  {
    path: "src/stories/Header.tsx",
    name: "Header",
    props: [],
    component: Header,
  },
];

export { React, ReactDOM };