import AuthForm from "@/components/AuthForm";
import { FormMessage, Message } from "@/components/FormMessage";

export default async function SignupPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <AuthForm type="signup" />
      <FormMessage message={searchParams} />
    </div>
  );
}
