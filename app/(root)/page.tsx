import Voice from "@/components/Voice";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <UserButton />

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <Voice />
    </div>
  );
}
