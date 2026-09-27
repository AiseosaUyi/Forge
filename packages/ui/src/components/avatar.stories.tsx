import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { initials: "SL", size: "normal" },
  argTypes: {
    size: { control: "select", options: ["xsmall", "mini", "small", "normal", "large", "xlarge"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar size="xsmall" initials="E" />
      <Avatar size="mini" initials="SL" />
      <Avatar size="small" initials="SL" />
      <Avatar size="normal" initials="AK" />
      <Avatar size="large" initials="KW" />
      <Avatar size="xlarge" initials="KW" />
    </div>
  ),
};

export const WithImage: Story = {
  args: { src: "https://i.pravatar.cc/100", alt: "User photo", initials: "U" },
};
