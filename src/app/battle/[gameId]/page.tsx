import BattleUI from "@/app/ui/battle/battle-ui";
import Game from "@/app/ui/battle/game";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/app/ui/navbar";


export default function GameJoin({searchParams, params}: {
  searchParams: {name?: string},
  params: {gameId: string},
}) {
  async function appendName(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;

    if(!name) return;

    redirect(`/battle/${params.gameId}?name=${name}`);
  }
  if (!searchParams.name) {
    return (
        <div className={'w-screen bg-[#eeeeee] min-h-screen'}>
          <Navbar/>
        <div className={'flex justify-center'}>
        <Card className={'w-[560px] m-10'}>
          <CardHeader>
            <CardTitle>Join Game</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className={'text-2xl'}>Enter a nickname to continue</CardDescription>
            <form>
              <Input
                className={'rounded my-3 text-2xl font-bold p-3 text-gray-900 hover:bg-gray-100'}
                type={'text'}
                name={'name'}
                placeholder={'Enter your name'}
              />
              <Button>Join Game</Button>
            </form>
          </CardContent>
        </Card>
        </div>
        </div>
    );
  }
  return <Game gameId={params.gameId} name={searchParams.name}/>
}