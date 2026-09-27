import {
  Alert,
  Avatar,
  Badge,
  BalanceCard,
  Button,
  Checkbox,
  EmptyCard,
  Input,
  InfoCard,
  KycProgressCard,
  RadioGroup,
  RadioGroupItem,
  StatCard,
  Switch,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@kwikpik/ui";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[20px] font-black text-[var(--color-text-main)]">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  );
}

export function App() {
  return (
    <TooltipProvider>
      <div className="mx-auto flex max-w-5xl flex-col gap-10 p-10">
        <header>
          <h1 className="text-[32px] font-black text-[var(--color-text-main)]">Kwikpik Design System</h1>
          <p className="text-[16px] text-[var(--color-text-sub)]">
            Living component kitchen sink — @kwikpik/ui, generated from the Kwikpik Web3 Figma source.
          </p>
        </header>

        <Section title="Buttons">
          <Button>Primary</Button>
          <Button intent="secondary">Secondary</Button>
          <Button intent="destructive">Destructive</Button>
          <Button intent="outline">Outline</Button>
          <Button intent="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
        </Section>

        <Section title="Badges">
          <Badge type="grey">Grey</Badge>
          <Badge type="completed">Completed</Badge>
          <Badge type="processing">Processing</Badge>
          <Badge type="failed">Failed</Badge>
          <Badge type="blue">Blue</Badge>
          <Badge type="secondary">Secondary</Badge>
        </Section>

        <Section title="Alerts">
          <Alert state="success" className="w-full">Your payment was successful.</Alert>
          <Alert state="error" className="w-full">Something went wrong. Please try again.</Alert>
          <Alert state="warning" className="w-full">Your KYC verification is incomplete.</Alert>
        </Section>

        <Section title="Avatars">
          <Avatar size="mini" initials="E" />
          <Avatar size="small" initials="SL" />
          <Avatar size="normal" initials="AK" />
          <Avatar size="large" initials="KW" />
        </Section>

        <Section title="Form controls">
          <Input label="Email address" placeholder="you@business.com" className="w-72" />
          <Input label="Amount" placeholder="0.00" error="This field is required" className="w-72" />
          <Textarea label="Description" placeholder="Tell customers what this payment link is for" className="w-72" />
          <div className="flex flex-col gap-3">
            <Checkbox label="Allow customers to set price" />
            <Switch label="Collect phone number" />
            <RadioGroup defaultValue="registered">
              <RadioGroupItem value="not-registered" label="Not registered" />
              <RadioGroupItem value="registered" label="Registered entity" />
            </RadioGroup>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button intent="outline" size="sm">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>This is a tooltip</TooltipContent>
          </Tooltip>
        </Section>

        <Section title="Cards">
          <StatCard label="Transactions Made" value="1,204" delta="+12%" />
          <BalanceCard
            label="Wallet Balance"
            value="₦10,000,898.59"
            assetDots={["primary", "success", "warning"]}
            actions={[{ label: "Fund" }, { label: "Transfer" }, { label: "Swap" }]}
            className="w-80"
          />
          <KycProgressCard
            title="Verify Account"
            percent={50}
            stepsLabel="3 of 5 steps completed"
            ctaLabel="Continue"
            className="w-80"
          />
          <InfoCard
            title="Need help?"
            body="Contact us for support with your account."
            linkLabel="Contact us"
            className="w-72"
          />
          <EmptyCard
            icon={<span>📄</span>}
            title="No Active Payment Link"
            subtitle="Create a payment link to start receiving payments from customers."
            ctaLabel="Create link"
            className="w-72"
          />
        </Section>
      </div>
    </TooltipProvider>
  );
}
