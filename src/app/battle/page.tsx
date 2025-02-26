import Navbar from "@/app/ui/navbar";
import Link from "next/link";

export default function Battle() {
  return (
    <main className={'bg-[#eeeeee] min-h-screen'}>
      <Navbar/>
      <div className={'flex justify-center'}>
        <table className={'flex mx-0 my-16 bg-[#f6fbff] w-1/2 h-auto text-gray-900 justify-center rounded-lg p-0'}>
          <tbody className={'p-0'}>
          <tr className={'my-9 flex justify-center rounded'}>
            <td className={''}>
              Filler text that the user will type in
            </td>
          </tr>
          <tr className={'my-9 flex justify-center min-w-full p-0 m-0'}>
            <td className={'min-w-full'}>
              <input
                className={'bg-[#ffffff] min-w-full'}
                type={'text'}
                placeholder={'Type the above text here'}
              />
            </td>

          </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
