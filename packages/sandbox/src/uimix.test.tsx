import reactRenderer from "react-test-renderer";
import { describe, expect, it } from "vitest";
import { Button, Page } from "./uimix";

describe(Button.name, () => {
  it("render", async () => {
    expect(
      reactRenderer
        .create(
          <Button
            className="other-class"
            textProps={{
              children: "Hello, world!",
            }}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});

describe(Page.name, () => {
  it("render", async () => {
    expect(
      reactRenderer
        .create(
          <Page
            buttonProps={{
              label: "Override Button Label",
            }}
            stackProps={{
              // TODO: typing
              textProps: {
                children: "Override inner item",
              },
            }}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});