import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Welcome to <br />
            <span className="text-blue-700 text-5xl md:text-6xl">
              Cabinet-pro
            </span>
          </h1>
        </div>

        <div className="text-center max-w-xl flex flex-col items-center justify-center">
          <p className="mb-8">
            Optimisez la gestion de votre établissement de santé avec une interface intuitive et moderne. Notre plateforme vous permet de centraliser toutes les informations patients, de simplifier la prise de rendez-vous et d'améliorer la collaboration entre vos équipes médicales pour un suivi irréprochable.
          </p>
        </div>

        <div className="flex gap-4">
          {userId ? (
            <></>
          ) : (
            <>
              <Link href="/sign-up">
                <Button className="md:text-base font-light">New Patient</Button>
              </Link>

              <Link href="/sign-up">
                <Button variant={"outline"} className="md:text-base underline hover:text-blue-600">
                  Login to account</Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <footer className="mt-8">
        <p className="text-center text-sm">
          &copy; 2026 Cabinet-pro Management System.All rights reserved.
        </p>
      </footer>
    </div>
  );
}