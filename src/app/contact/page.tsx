'use client';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Navbar from "@/app/ui/navbar";

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <div className={"flex flex-col items-center p-6"}>
        <Card className={"max-w-2xl w-full p-6 shadow-lg rounded-lg bg-white border border-gray-200"}>
          <CardHeader className={"text-center text-xl font-semibold text-gray-700 border-b pb-4"}>Get in Touch</CardHeader>
          <CardContent className={"flex flex-col items-center p-4"}>
            <p className={"text-gray-600 mb-4"}>Feel free to reach out via any of the platforms below:</p>
            <div className={"flex justify-center space-x-6 mt-4"}>
              <a href={"https://www.linkedin.com/in/jonathan-sapolu-359821289/"} target={"_blank"} rel={"noopener noreferrer"} className={"hover:scale-110 transition-transform"}>
                <FaLinkedin size={35} className="text-blue-600 hover:text-blue-800" />
              </a>
              <a href={"https://github.com/jsapolu99"} target={"_blank"} rel={"noopener noreferrer"} className={"hover:scale-110 transition-transform"}>
                <FaGithub size={35} className={"text-gray-700 hover:text-black"} />
              </a>
              <a href={"mailto:Jonathansapolu3@gmail.com"} target={"_blank"} rel={"noopener noreferrer"} className={"hover:scale-110 transition-transform"}>
                <FaEnvelope size={35} className={"text-red-600 hover:text-red-800"} />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
