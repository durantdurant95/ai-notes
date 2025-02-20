export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 text-sm pt-4">
      {"success" in message && (
        <div className="text-foreground border-foreground px-4">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-destructive-foreground border-destructive-foreground px-4">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground px-4">{message.message}</div>
      )}
    </div>
  );
}
