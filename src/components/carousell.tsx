
    import { Carousel } from "flowbite-react";
    import Link from "next/link";
    
    export default function carousel() {
      return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel>
            <Link href="/event/angklung">
            <img src="/angklung.jpg" alt="..." />
            </Link>
            <Link href="/event/konser-eve-di-indonesia">
            <img src="/konser-eve-di-indonesia.jpg" alt="..." />
            </Link>
            <Link href="/event/pokemon">
            <img src="/pokemon.jpg" alt="..." />
            </Link>
            <Link href="/event/runFes">
            <img src="/runFes.webp" alt="..." />
            </Link>
          </Carousel>
        </div>
      );
    }
