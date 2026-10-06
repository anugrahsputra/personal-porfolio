import { CircleAlert } from "lucide-react";
import { Input } from "downormal-ui";

export function Labeled() {
  return (
    <div className="max-w-sm p-6">
      <label htmlFor="input-name" className="mb-2 block text-sm/5">
        Name
      </label>
      <Input id="input-name" autoComplete="name" defaultValue="Anugrah Surya Putra" />
    </div>
  );
}

export function Placeholder() {
  return (
    <div className="max-w-sm p-6">
      <label htmlFor="input-email" className="mb-2 block text-sm/5">
        Email
      </label>
      <Input id="input-email" type="email" placeholder="name@example.com" />
    </div>
  );
}

export function WithError() {
  return (
    <div className="max-w-sm p-6">
      <label htmlFor="input-bad" className="mb-2 block text-sm/5">
        Email
      </label>
      <Input
        id="input-bad"
        type="email"
        defaultValue="anugrah@"
        aria-invalid
        aria-describedby="input-bad-error"
      />
      <p
        id="input-bad-error"
        className="mt-2 flex gap-2 rounded-sm bg-destructive px-2 py-1.5 text-sm/5 text-foreground"
      >
        <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
        Enter an email address like name@example.com.
      </p>
    </div>
  );
}

export function Disabled() {
  return (
    <div className="max-w-sm p-6">
      <label htmlFor="input-off" className="mb-2 block text-sm/5">
        Subject
      </label>
      <Input id="input-off" disabled defaultValue="Freelance app project" />
    </div>
  );
}
