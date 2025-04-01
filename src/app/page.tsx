'use client';
import Navbar from "@/app/ui/navbar";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import {FormEvent} from "react";
import {Card, CardDescription, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function Home() {

  const router = useRouter()
  function createGame() {
    const inviteCode = uuidv4();
    router.push(`/battle/${inviteCode}`);
  }

  function joinGame(e: FormEvent<HTMLFormEvent>) {
    e.preventDefault()
    const form = e.currentTarget;
    const formData = new FormData(form);

    const inviteCode = formData.get('inviteCode') as string;

    if (!inviteCode) {
      return;
      // Possibly use ShadCN UI to show an error message
    }
    router.push(`/battle/${inviteCode}`);
  }

  return (
    <main className={'bg-[#eeeeee] min-h-screen'}>
      <Navbar/>
      <div className={'flex justify-center'}>
        <Card className={'w-[350px] m-3'}>
          <CardHeader>
            <CardTitle>Welcome to Type Battle</CardTitle>
            <CardDescription>Race against your friends and prove who’s the ultimate typing champion! Customize the game to match your style, challenge rivals in real-time, and climb the leaderboard. Only one can claim the top spot—will it be you?</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className={'flex justify-center'}>
        <Card className={'w-[350px] m-3'}>
          <CardHeader>
            <CardTitle>Host Match</CardTitle>
          <CardDescription>Host a new match</CardDescription>
          </CardHeader>
          <CardContent>
            <Button

              onClick={createGame}
            >
              Host Match
            </Button>
          </CardContent>
        </Card>
        <Card className={'w-[350px] m-3'}>
          <CardHeader>
            <CardTitle>Join Match</CardTitle>
            <CardDescription>Enter the invite code to join a match</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={joinGame}>
              <Input
                className={'rounded my-3 text-2xl font-bold p-3 text-gray-900 hover:bg-green-400'}
                type={'text'}
                name={'inviteCode'}
                placeholder={'Enter invite code'}
              />
              <Button
                variant={'outline'}
                href={'/match-making/join'}
              >
                Join Match</Button>
            </form>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}