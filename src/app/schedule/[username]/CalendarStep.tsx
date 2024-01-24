import { Calendar } from '@/components/calendar'

export function CalendarStep() {
  return (
    <div className="relative flex items-start justify-between">
      <Calendar />
      {true && (
        <div className="flex w-full max-w-[280px] flex-col pl-6">
          <header className="h-10 text-base font-medium leading-relaxed text-white">
            Terça-feira <span className="text-gray-200">23 de janeiro</span>
          </header>
          <div className="absolute bottom-0 right-0 top-10 flex w-[calc(280px-24px)] flex-col overflow-y-scroll">
            <section className="grid grid-flow-col grid-rows-1 gap-2 md:grid-flow-row md:grid-cols-1">
              {HOURS.map((hour) => (
                <button
                  disabled={hour === '14:00'}
                  key={hour}
                  className="flex items-center justify-center rounded-md bg-gray-600 px-7 py-1 text-sm leading-relaxed text-gray-100 hover:bg-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-1 disabled:pointer-events-none disabled:bg-transparent disabled:opacity-40 "
                >
                  {hour}
                </button>
              ))}
            </section>
          </div>
        </div>
      )}
    </div>
  )
}

const HOURS = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
]
