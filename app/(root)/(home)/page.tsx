import VoiceForm from "@/components/shared/form/VoiceForm";
import Notes from "@/components/shared/Notes";
import { getUserByClerkId } from "@/lib/actions/user.action";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-up");
  }
  const mongoUser = await getUserByClerkId({ clerkId: userId });

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-3">
      <h1 className="mb-7 text-4xl font-semibold">Start Taking Note</h1>

      <VoiceForm mongoId={JSON.stringify(mongoUser._id)} />

      {/* TODO: add type to Notes down below and then render all the note to the notes page */}

      <Notes type="home" author={mongoUser._id} clerkId={userId} />
    </div>
  );
}
