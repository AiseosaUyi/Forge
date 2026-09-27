import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: { label: "Email address", placeholder: "you@business.com" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "We'll never share your email." } };
export const WithError: Story = { args: { error: "This field is required" } };
