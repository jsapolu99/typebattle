import BattleUI from "@/app/ui/battle/battle-ui";
import Game from "@/app/ui/battle/game";


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
      <main className={'mx-auto max-w-5xl w-ful mt-10 p-5'}>
          <h2 className={'text-center'}>Join Game</h2>
          <form onSubmit={appendName}>
            <input
              className={'rounded my-3 text-2xl font-bold p-3 text-gray-900 hover:bg-green-400'}
              type={'text'}
              name={'name'}
              placeholder={'Enter your name'}
            />
            <button
              className={'bg-blue-300 rounded my-3 text-2xl font-bold p-3 text-gray-900 hover:bg-green-400'}
              href={'/battle/join'}
            >
              Join Game
            </button>
          </form>
      </main>
    );
  }
  return <Game gameId={params.gameId} name={searchParams.name}/>
}