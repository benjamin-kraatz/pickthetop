import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto min-h-screen w-full flex flex-col items-center justify-center">
      <SignIn />
    </div>
  );
}
