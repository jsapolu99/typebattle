import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/app/ui/navbar";

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-4">About TypeBattle</h1>
        <Card className="max-w-2xl w-full p-4">
          <CardContent>
            <p className="text-lg mb-4">
              <strong>TypeBattle</strong> is a fast-paced multiplayer typing race game where players compete in real-time to finish a given text as quickly as possible. The game leverages <strong>WebSockets</strong> to provide seamless, low-latency interactions, ensuring a smooth and competitive experience.
            </p>

            <h2 className="text-xl font-semibold mt-4 mb-2">How It Works</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Join or create a race lobby with friends or random players.</li>
              <li>Compete in real-time, with live progress tracking.</li>
              <li>Improve your typing speed and accuracy while having fun!</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4 mb-2">Why Play?</h2>
            <p>
              {"TypeBattle isn't just about speed—it's about improving your typing skills while enjoying competitive gameplay. With real-time updates and friendly competition, it's the perfect way to sharpen your keyboard reflexes."}
            </p>

            <h2 className="text-xl font-semibold mt-4 mb-2">Built With</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>React & TailwindCSS for a modern UI.</li>
              <li>WebSockets (Socket.io) for real-time multiplayer gameplay.</li>
              <li>Node.js & Next.js for the backend.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
