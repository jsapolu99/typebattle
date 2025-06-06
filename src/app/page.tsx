'use client';
import Navbar from "@/app/ui/navbar";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState("");

  function createGame() {
    const newInviteCode = uuidv4();
    router.push(`/battle/${newInviteCode}`);
  }

  function joinGame() {
    if (!inviteCode || inviteCode.length !== 36) {
      toast("Please enter a valid invite code");
      return;
    }
    router.push(`/battle/${inviteCode}`);
  }

  return (
    <main className="bg-[#eeeeee] min-h-screen">
      <Navbar />
      <div className="flex justify-center">
        <Card className="w-[350px] m-3">
          <CardHeader>
            <CardTitle>Welcome to Type Battle</CardTitle>
            <CardDescription>
              Race against your friends and prove who’s the ultimate typing champion! Customize the game to match your style, challenge rivals in real-time, and climb the leaderboard. Only one can claim the top spot—will it be you?
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="flex justify-center">
        <Card className="w-[350px] m-3">
          <CardHeader>
            <CardTitle>Host Match</CardTitle>
            <CardDescription>Host a new match</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={createGame}>Host Match</Button>
          </CardContent>
        </Card>
        <Card className="w-[350px] m-3">
          <CardHeader>
            <CardTitle>Join Match</CardTitle>
            <CardDescription>Enter the invite code to join a match</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              className="rounded my-3 font-bold p-3 text-gray-900 hover:bg-gray-100"
              type="text"
              placeholder="Enter invite code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />
            <Button onClick={joinGame}>Join Match</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
