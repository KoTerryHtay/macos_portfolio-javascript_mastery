import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Dock, Navbar, Welcome } from "@/components";
import { Finder, Resume, Safari, Terminal, Text } from "@/windows";

gsap.registerPlugin(Draggable);

export default function App() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
    </main>
  );
}
