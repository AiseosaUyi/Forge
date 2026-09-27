import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Label" },
  argTypes: {
    type: { control: "select", options: ["grey", "completed", "processing", "failed", "blue", "yellow", "secondary"] },
    size: { control: "select", options: ["small", "medium", "mini"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grey: Story = { args: { type: "grey" } };

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge type="grey">Grey</Badge>
      <Badge type="completed">Completed</Badge>
      <Badge type="processing">Processing</Badge>
      <Badge type="failed">Failed</Badge>
      <Badge type="blue">Blue</Badge>
      <Badge type="yellow">Yellow</Badge>
      <Badge type="secondary">Secondary</Badge>
    </div>
  ),
};
