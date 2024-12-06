"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";

type Props = {
  toRules?: boolean;
  children: React.ReactNode;
};

export default function Form({ toRules = false, children }: Props) {
  const { user } = useUser();
  const router = useRouter();

  const completeMutate = api.users.completeSetup.useMutation();
  const loading = completeMutate.isPending;

  return (
    <form
      action={async () => {
        const res = await completeMutate.mutateAsync();
        if (res.success) {
          await user?.reload();
          if (toRules) {
            router.push("/rules");
          } else {
            router.push("/game");
          }
        } else {
          const errorCode = res.error;
          toast.error("Das hat nicht geklappt. Bitte versuche es erneut.", {
            description: (
              <>
                Bleibt der Fehler bestehen, melde ihn bei{" "}
                <Link
                  href="https://github.com/benjamin-kraazu/pickthetop"
                  className="underline"
                  target="_blank"
                >
                  GitHub
                </Link>{" "}
                {errorCode && (
                  <>
                    mit dem Code <b>{errorCode}</b>
                  </>
                )}
              </>
            ),
          });
        }
      }}
    >
      <fieldset disabled={loading}>{children}</fieldset>
    </form>
  );
}
