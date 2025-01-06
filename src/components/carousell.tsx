import { Carousel } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

export default function carousel() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <Link href="/event/angklung">
          <Image width={1700} height={700} src="/angklung.jpg" alt="..." />
        </Link>
        <Link href="/event/konser-eve-di-indonesia">
          <Image width={1700} height={700} src="/konser-eve-di-indonesia.jpg" alt="..." />
        </Link>
        <Link href="/event/pokemon">
          <Image width={1700} height={700} src="/pokemon.jpg" alt="..." />
        </Link>
        <Link href="/event/runFes">
          <Image width={1700} height={700} src="/runFes.webp" alt="..." />
        </Link>
      </Carousel>
    </div>
  );
}
