import Navbar from "@/app/ui/navbar";
import Link from "next/link";

export default function Battle() {
  return (
    <body>
    <Navbar/>
    <main className={'flex items-start min-h-screen bg-[#a7c8da] p-3'}>
      <div className={'content-center items-center'}>
        <table className={'bg-white w-96 h-64 text-gray-900 '}>
          <tbody className={'bg-gray-300'}>
          <td>Filler text that the player will type in </td>
          <td>
            <input></input>
          </td>
          </tbody>
        </table>
      </div>
    </main>
    </body>
  );
}
