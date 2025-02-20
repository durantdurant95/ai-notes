import AuthForm from "@/components/AuthForm";
import { FormMessage, Message } from "@/components/FormMessage";

export default async function LoginPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 gap-12">
      <AuthForm type="login" />
      <FormMessage message={searchParams} />
    </div>
  );
}
