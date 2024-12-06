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

export default function SetupPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Herzlich Willkommen!
        </CardTitle>
      </CardHeader>
      <CardContent className="scrollbar max-h-[500px] max-w-[420px] overflow-y-auto">
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quam
          eos, praesentium quae aspernatur laboriosam beatae ad eum deserunt
          amet debitis?
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit earum
          a dolorem doloribus laborum. Accusamus delectus, recusandae velit
          cupiditate corrupti nostrum, a quidem rerum dolor eaque tempore
          eveniet cumque ut assumenda nobis distinctio inventore culpa quaerat!
          Quidem labore ullam aliquid sequi?
        </div>
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi
          consequuntur quis pariatur facilis vel, sunt distinctio debitis
          sapiente voluptatum voluptate, veniam architecto quam facere?
        </div>
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
