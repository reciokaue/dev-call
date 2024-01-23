// interface CalendarProps {}
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { shortWeekDays } from '@/utils/get-week-day'

import { Button } from './ui/button'

export async function Calendar() {
  return (
    <div className="col-span-8 flex w-full flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-base font-medium leading-relaxed text-white">
          Janeiro <span className="text-gray-200">2024</span>
        </h1>
        <div className="text-gray-200">
          <Button variant="ghost" size="icon">
            <ChevronLeft />
          </Button>
          <Button variant="ghost" size="icon">
            <ChevronRight />
          </Button>
        </div>
      </header>
      <table className="w-full table-fixed border-separate border-spacing-1">
        <thead className="text-sm font-medium uppercase leading-relaxed text-gray-200">
          <tr className="text-left">
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}</th>
            ))}
          </tr>
        </thead>
        <tbody className='before:block before:leading-3 before:text-gray-800 before:content-["."]'>
          {[8, 9, 10, 11].map((day, index) => (
            <tr key={day}>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <td className="box-border" key={day}>
                  <button
                    disabled={day !== day + index}
                    className="aspect-square w-full rounded-sm bg-gray-600 text-center  transition-colors hover:bg-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:ring-offset-1 disabled:pointer-events-none disabled:bg-transparent"
                  >
                    {day + index * 7}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
