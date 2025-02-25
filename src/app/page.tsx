import Navbar from "@/app/ui/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <body>
      <Navbar/>
      <main className={'flex items-start min-h-screen bg-[#a7c8da] p-3'}>
       <div className='w-auto h-auto rounded-lg bg-white shadow-lg py-4 px-4'>
         <h1 className={'text-gray-900'}>TypeBatte - Battle your friends to assert dominance</h1>
          <Link
            href={'/battle'}
            className='flex my-3 p-3 text-white md:w-40 bg-green-500 rounded-lg text-center hover:bg-green-400'
          >
            Enter a Typing Race</Link>
       </div>
      </main>
    </body>
  );
}
