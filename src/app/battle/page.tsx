import Navbar from "@/app/ui/navbar";
import Link from "next/link";
import BattleUI from "@/app/ui/battle/battle-ui";

export default function Battle() {

  const sampleText = 'Filler text for now! But what if it was a shit ton of text like this would it still possible look good on that format idk so that is what we are aiming to find out';


  function roundOver (props) {
    const showRoundLost = props.condition;

    const showRoundComplete = props.condition;
  }
  return (
    <main className={'bg-[#eeeeee] min-h-screen'}>
      <Navbar/>
      <div className={'flex justify-center'}>
        <BattleUI text={sampleText} />
      </div>
    </main>
  );
}
