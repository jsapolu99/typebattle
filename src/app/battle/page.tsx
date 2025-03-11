import Navbar from "@/app/ui/navbar";
import Link from "next/link";
import BattleUI from "@/app/ui/battle/battle-ui";

export default function Battle() {

  const sampleText = 'Filler text for now';
  const time = 100;
  return (
    <main className={'bg-[#eeeeee] min-h-screen'}>
      <Navbar/>
      <div className={'flex justify-center'}>
        <BattleUI text={sampleText} time={time}/>
      </div>
    </main>
  );
}
