import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AppButton } from "../components/AppButton/AppButton";

export default {
  title: "App Button",
  component: AppButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AppButton>;

const Template: ComponentStory<typeof AppButton> = (args) => (
  <AppButton {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Large",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Small",
};
