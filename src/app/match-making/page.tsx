import Navbar from "@/app/ui/navbar";
import Link from "next/link";


export default function Page() {
  return (
    <main className={'bg-[#eeeeee] min-h-screen'}>
      <Navbar/>
      <div className={'flex justify-center'}>
        <Link
          className={'bg-blue-300 rounded my-3 text-2xl font-bold p-3 text-gray-900 hover:bg-green-400'}
          href={'/match-making/host'}
        >
          Host Match
        </Link>
      </div>
      <div className={'flex justify-center'}>
        <Link
          className={'bg-blue-300 rounded my-3 text-2xl font-bold p-3 text-gray-900 hover:bg-green-400'}
          href={'/match-making/join'}
        >
          Join Match</Link>
      </div>
    </main>
  );
}