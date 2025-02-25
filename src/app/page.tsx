import Navbar from "@/app/ui/navbar";

export default function Home() {
  return (
    <body>
      <Navbar/>
      <main className={'flex items-start justify-center min-h-screen bg-[#a7c8da] pt-36'}>
       <div className='w-3/4 h-auto rounded-lg bg-white shadow-lg py-4 px-4'>
         <h1 className={'text-gray-900 text'}>TypeBatte - Battle your friends to assert dominance</h1>
          <button className='my-2 p-3 text-white md:w-40 bg-green-500 rounded-lg text-center'>Enter a Typing Race</button>
       </div>
      </main>
    </body>
  );
}
