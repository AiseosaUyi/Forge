import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  StatCard,
  BalanceCard,
  KycProgressCard,
  InfoCard,
  EmptyCard,
} from "./card";
import { Button } from "./button";

const meta = {
  title: "Components/Card",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primitives: Story = {
  render: () => (
    <Card style={{ width: 320 }}>
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>A short supporting description.</CardDescription>
      </CardHeader>
      <CardContent>Compose any content here using the shadcn-style primitives.</CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Stat: Story = {
  render: () => <StatCard label="Transactions Made" value="1,204" delta="+12%" />,
};

export const Balance: Story = {
  render: () => (
    <BalanceCard
      label="Wallet Balance"
      value="₦10,000,898.59"
      assetDots={["primary", "success", "warning"]}
      actions={[{ label: "Fund" }, { label: "Transfer" }, { label: "Swap" }]}
      style={{ width: 320 }}
    />
  ),
};

export const KycProgress: Story = {
  render: () => (
    <KycProgressCard
      title="Verify Account"
      percent={50}
      stepsLabel="3 of 5 steps completed"
      ctaLabel="Continue"
      style={{ width: 320 }}
    />
  ),
};

export const Info: Story = {
  render: () => (
    <InfoCard
      title="Need help?"
      body="Contact us for support with your account."
      linkLabel="Contact us"
      style={{ width: 320 }}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <EmptyCard
      icon={<span>📄</span>}
      title="No Active Payment Link"
      subtitle="Create a payment link to start receiving payments from customers."
      ctaLabel="Create link"
      style={{ width: 320 }}
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <StatCard label="Transactions Made" value="1,204" delta="+12%" />
      <BalanceCard
        label="Wallet Balance"
        value="₦10,000,898.59"
        assetDots={["primary", "success", "warning"]}
        actions={[{ label: "Fund" }, { label: "Transfer" }, { label: "Swap" }]}
        style={{ width: 320 }}
      />
      <KycProgressCard title="Verify Account" percent={50} stepsLabel="3 of 5 steps completed" ctaLabel="Continue" style={{ width: 320 }} />
      <InfoCard title="Need help?" body="Contact us for support with your account." linkLabel="Contact us" style={{ width: 280 }} />
      <EmptyCard
        icon={<span>📄</span>}
        title="No Active Payment Link"
        subtitle="Create a payment link to start receiving payments from customers."
        ctaLabel="Create link"
        style={{ width: 280 }}
      />
    </div>
  ),
};
