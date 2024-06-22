import Voice from "@/components/Voice";
import { UserProfile } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-3">
      {/* <h1>Hello World</h1> */}

      {/* <UserProfile /> */}

      <Voice />
    </div>
  );
}
