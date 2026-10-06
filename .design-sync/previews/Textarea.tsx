import { Textarea } from "downormal-ui";

export function Message() {
  return (
    <div className="max-w-md p-6">
      <label htmlFor="textarea-message" className="mb-2 block text-sm/5">
        Message
      </label>
      <Textarea
        id="textarea-message"
        rows={6}
        defaultValue="Hi Anugrah, we're building a Flutter app for a retail client and need help with the Android release. Are you free next month?"
      />
    </div>
  );
}

export function Empty() {
  return (
    <div className="max-w-md p-6">
      <label htmlFor="textarea-empty" className="mb-2 block text-sm/5">
        Message
      </label>
      <Textarea id="textarea-empty" rows={4} placeholder="What are you working on?" />
    </div>
  );
}
