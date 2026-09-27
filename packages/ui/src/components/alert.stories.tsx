import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: { children: "Your payment was successful." },
  argTypes: {
    state: { control: "select", options: ["success", "error", "warning", "info"] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = { args: { state: "success" } };
export const ErrorState: Story = { name: "Error", args: { state: "error", children: "Something went wrong. Please try again." } };
export const Warning: Story = { args: { state: "warning", children: "Your KYC verification is incomplete." } };
export const Info: Story = { args: { state: "info", children: "Payments settle within 2-5 minutes." } };
export const Dismissible: Story = { args: { state: "info", onClose: () => alert("closed") } };
