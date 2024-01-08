import Image from 'next/image'

import { ClaimUsernameForm } from '@/components/ClaimUsernameForm'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="h-screen overflow-hidden">
      <div className="m-auto flex h-screen flex-col items-center justify-center gap-12 p-6 md:w-[calc(100vw-(100vw-1160px)/2)] md:flex-row md:gap-24 md:p-12">
        <section className="relative col-span-6 ml-auto flex flex-col items-start justify-center gap-4">
          <h1 className="max-w-[480px] text-3xl font-extrabold leading-tight text-primary md:text-6xl">
            Agendamento descomplicado
          </h1>
          <p className="max-w-[480px] text-base leading-relaxed text-gray-200 md:text-xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </p>
          <ClaimUsernameForm />

          <picture className="absolute -left-60 top-1/2 -z-50 h-[681px] w-[1208px] -translate-y-1/2">
            <Image
              className="w-full flex-shrink-0"
              src="/images/hero-background.png"
              width={1208}
              height={681}
              alt=""
            />
          </picture>
        </section>
        <picture className="col-span-6 flex w-full items-center justify-center md:mr-auto">
          <Image
            className="w-full flex-shrink-0 md:max-w-[827px]"
            src="/images/appPreview.png"
            width={827}
            height={442}
            priority
            alt="Calendário simbolizando aplicação em funcionamento"
          />
        </picture>
      </div>
    </main>
  )
}
