import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Get Started" },
  argTypes: {
    intent: { control: "select", options: ["primary", "secondary", "destructive", "outline", "ghost"] },
    size: { control: "select", options: ["xl", "l", "sm", "mini"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { intent: "primary" } };
export const Secondary: Story = { args: { intent: "secondary" } };
export const Destructive: Story = { args: { intent: "destructive" } };
export const Outline: Story = { args: { intent: "outline" } };
export const Ghost: Story = { args: { intent: "ghost" } };
export const Disabled: Story = { args: { disabled: true } };

export const AllSizes: Story = {
  args: { intent: "primary" },
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button {...args} size="xl" />
      <Button {...args} size="l" />
      <Button {...args} size="sm" />
      <Button {...args} size="mini" />
    </div>
  ),
};
