import { CircleAlert, CircleCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "downormal-ui";

export function Sent() {
  return (
    <div className="p-6">
      <Alert>
        <CircleCheck />
        <AlertTitle>Message sent</AlertTitle>
        <AlertDescription>Thanks. I&apos;ll reply by email.</AlertDescription>
      </Alert>
    </div>
  );
}

export function Failed() {
  return (
    <div className="p-6">
      <Alert variant="destructive">
        <CircleAlert />
        <AlertTitle>Your message didn&apos;t send</AlertTitle>
        <AlertDescription>
          The mail server didn&apos;t accept it. Try again, or email me at{" "}
          <a href="mailto:anugrahsputra@gmail.com" className="underline underline-offset-4">
            anugrahsputra@gmail.com
          </a>
          .
        </AlertDescription>
      </Alert>
    </div>
  );
}
