import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
} from "downormal-ui";

export function ContactForm() {
  return (
    <div className="p-6">
      <Card className="p-[clamp(1.25rem,2.5vw,2rem)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="card-name" className="mb-2 block text-sm/5">
                Name
              </label>
              <Input id="card-name" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="card-email" className="mb-2 block text-sm/5">
                Email
              </label>
              <Input id="card-email" type="email" placeholder="name@example.com" />
            </div>
          </div>
          <div>
            <label htmlFor="card-message" className="mb-2 block text-sm/5">
              Message
            </label>
            <Textarea id="card-message" rows={4} />
          </div>
          <Button type="submit" size="lg">
            Send message
          </Button>
        </form>
      </Card>
    </div>
  );
}

export function WithSections() {
  return (
    <div className="p-6">
      <Card className="gap-4 py-6">
        <CardHeader>
          <CardTitle className="type-h3">Mobile Engineer</CardTitle>
          <CardDescription>PT Bangun Rancang Indonesia Kita (BRIK) · South Jakarta</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm/[22px] text-foreground/70">
            Built a local-first sync engine that automatically saves and
            uploads data in the background, eliminating the need for drivers to
            manually refresh the app.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            Full experience
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
