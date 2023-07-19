import { Button, Header } from "ui";
import '../styles/globals.css'
import Image from "next/image";
import PrimaryButton from "../components/buttons/PrimaryButton";


export default function Page() {
  return (
    <main>
      <div className="introduce">
        <div>
          <h1 className="introduce__title">Прокачай<br/>свой Instagram сэкономив кучу времени!</h1>
          <p>Генерация постов/картинок за секунды.</p>
          <p>Бесплатно и 100% безопасно.</p>
          <PrimaryButton>Начать прокачку</PrimaryButton>
        </div>
        <div>
          <Image 
            src={'/assets/images/smartphone.svg'}
            alt="hand and smartphone"
            width={771.67}
            height={1048.341}
          />
        </div>
      </div>
    </main>
  );
}
