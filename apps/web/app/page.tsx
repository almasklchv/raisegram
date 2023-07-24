import { Button, Header } from "ui";
import '../styles/globals.css'
import Introduce from "../components/blocks/Introduce";
import HowToStart from "../components/blocks/HowToStart";


export default function Page() {
  return (
    <main>
      <Introduce />
      <HowToStart />
    </main>
  );
}
