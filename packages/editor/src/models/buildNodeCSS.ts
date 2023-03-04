import { NodeType, StackDirection, StyleJSON } from "@uimix/node-data";

export function buildNodeCSS(
  nodeType: NodeType,
  style: StyleJSON,
  parentStackDirection?: StackDirection
): React.CSSProperties {
  if (nodeType === "component") {
    return {};
  }

  const cssStyle: React.CSSProperties = {};

  const position = parentStackDirection ? "relative" : "absolute";
  cssStyle.position = position;
  if (position === "absolute") {
    if (style.position.x.type === "start") {
      cssStyle.left = style.position.x.start + "px";
    } else if (style.position.x.type === "end") {
      cssStyle.right = style.position.x.end + "px";
    }
    if (style.position.y.type === "start") {
      cssStyle.top = style.position.y.start + "px";
    } else if (style.position.y.type === "end") {
      cssStyle.bottom = style.position.y.end + "px";
    }
  }

  if (style.width.type === "fixed") {
    cssStyle.width = style.width.value + "px";
  } else if (style.width.type === "hugContents") {
    cssStyle.width = "max-content";
  } else {
    if (parentStackDirection === "x") {
      cssStyle.flex = 1;
    } else if (parentStackDirection === "y") {
      cssStyle.alignSelf = "stretch";
    } else {
      cssStyle.width = "100%";
    }
  }

  if (style.height.type === "fixed") {
    cssStyle.height = style.height.value + "px";
  } else if (style.height.type === "hugContents") {
    cssStyle.height = "max-content";
  } else {
    if (parentStackDirection === "y") {
      cssStyle.flex = 1;
    } else if (parentStackDirection === "x") {
      cssStyle.alignSelf = "stretch";
    } else {
      cssStyle.height = "100%";
    }
  }

  if (nodeType === "frame") {
    cssStyle.display = "flex";
    cssStyle.flexDirection = style.stackDirection === "x" ? "row" : "column";
    cssStyle.alignItems = (() => {
      switch (style.stackAlign) {
        case "start":
          return "flex-start";
        case "center":
          return "center";
        case "end":
          return "flex-end";
      }
    })();
    cssStyle.justifyContent = (() => {
      switch (style.stackJustify) {
        case "start":
          return "flex-start";
        case "center":
          return "center";
        case "end":
          return "flex-end";
        case "spaceBetween":
          return "space-between";
      }
    })();
    cssStyle.gap = style.gap + "px";
    cssStyle.paddingLeft = style.paddingLeft + "px";
    cssStyle.paddingRight = style.paddingRight + "px";
    cssStyle.paddingTop = style.paddingTop + "px";
    cssStyle.paddingBottom = style.paddingBottom + "px";

    cssStyle.background = style.fill ?? "transparent";
    cssStyle.borderStyle = "solid";
    cssStyle.borderColor = style.border ?? "transparent";
    cssStyle.borderTopWidth = style.borderTopWidth + "px";
    cssStyle.borderRightWidth = style.borderRightWidth + "px";
    cssStyle.borderBottomWidth = style.borderBottomWidth + "px";
    cssStyle.borderLeftWidth = style.borderLeftWidth + "px";
  }

  if (nodeType === "text") {
    cssStyle.whiteSpace = "break-spaces";
    cssStyle.display = "flex";
    cssStyle.flexDirection = "column";
    cssStyle.color = style.fill ?? "black";
    cssStyle.fontFamily = style.fontFamily;
    cssStyle.fontSize = style.fontSize + "px";
    cssStyle.fontWeight = style.fontWeight;
    cssStyle.lineHeight = style.lineHeight;
    cssStyle.letterSpacing = style.letterSpacing + "em";
    cssStyle.textAlign = style.textHorizontalAlign;
    cssStyle.justifyContent = (() => {
      switch (style.textVerticalAlign) {
        case "start":
          return "flex-start";
        case "center":
          return "center";
        case "end":
          return "flex-end";
      }
    })();
  }

  return cssStyle;
}
