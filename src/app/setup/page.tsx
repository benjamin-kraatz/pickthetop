import { Suspense } from "react";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Form from "./_components/Form";
import Username from "./_components/Username";
import Link from "next/link";

export default function SetupPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Herzlich Willkommen!
        </CardTitle>
      </CardHeader>
      <CardContent className="scrollbar max-h-[500px] max-w-[450px] overflow-y-auto">
        <div className="font-semibold">
          Schön, dass du da bist,{" "}
          <Suspense
            fallback={
              <div className="h-4 w-16 animate-pulse rounded-md bg-muted"></div>
            }
          >
            <Username />
          </Suspense>
          !
        </div>
        <br />
        <div>
          Schau dir die Anleitung an, um zu verstehen, wie das Spiel
          funktioniert.
        </div>
        <div>Oder du kannst gleich loslegen und das Spiel spielen.</div>
        <div className="mt-4">
          Schau&apos; doch auch mal bei{" "}
          <Link
            href="https://github.com/benjamin-kraatz/pickthetop"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>{" "}
          vorbei.
        </div>
        <div className="mt-8 font-bold">Viel Spaß!</div>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-end gap-1 border-t border-t-secondary py-4">
        <Suspense fallback={<Button disabled>Anleitung ansehen</Button>}>
          <Form toRules>
            <Button variant="secondary">Anleitung ansehen</Button>
          </Form>
        </Suspense>
        <Suspense fallback={<Button disabled>Loslegen &rarr;</Button>}>
          <Form>
            <Button>Loslegen &rarr;</Button>
          </Form>
        </Suspense>
      </CardFooter>
    </Card>
  );
}
