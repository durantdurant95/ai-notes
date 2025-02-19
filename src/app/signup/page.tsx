import AuthForm from "@/components/AuthForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <AuthForm type="signup" />
    </div>
  );
}
