//TODO
// import renderer from "react-test-renderer";
//

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Input from "./Input";

describe("Input Component", () => {
  const inputProps = {
    label: {
      name: "testNameInner",
      className: "nestedClassName",
    },
    id: "testid123",
    type: "text",
    labelClassName: "testClassName",
    name: "testName",
    required: false,
  };
  it("Renders without crashing", () => {
    render(
      <Input
        label={inputProps.label}
        id={inputProps.id}
        type={inputProps.type}
        name={inputProps.name}
        labelClassName={inputProps.label.className}
      />
    );

    expect(screen.getByText("testNameInner")).toBeInTheDocument();
  });

  it("Ensures the correct type of input renders", () => {
    const inputConfig = [{}];
    //todo
  });
});
