import Voice from "@/components/Voice";
import {
  SignInButton,
  SignedOut,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-3">
      <UserButton />

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <Voice />
    </div>
  );
}
