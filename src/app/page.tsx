import Navbar from "@/app/ui/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className={'min-h-screen bg-[#a7c8da]'}>
      <Navbar/>
      <div className='w-auto h-auto rounded-lg bg-white shadow-lg py-4 px-4'>
        <h1 className={'text-gray-900'}>TypeBatte - Battle your friends to assert dominance</h1>
        <Link
          href={'/battle'}
          className='flex my-3 p-3 text-white md:w-40 bg-green-500 rounded-lg text-center hover:bg-green-400'
        >
          Start New Battle</Link>
      </div>
    </main>
  );
}
