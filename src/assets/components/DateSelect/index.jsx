
import { useState } from 'react'
import { addDays, subDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { Icon } from '~/assets/components/Icon'


export const DateSelect = ({ currentDate, onChange }) => {

  const prevDay = () => {
    const vdata = subDays(currentDate, 1);
    onChange(vdata);
  }

  const nextDay = () => {
    const vdata = addDays(currentDate, 1);
    onChange(vdata);
  }


  return (
    <div className=" p-4 flex space-4 items-center justify-center">
      <Icon name="arrowLeft" className="w-6 text-red-500" onClick={prevDay} />
      <span className='font-bold'>{format(currentDate, "d 'de' MMMM", { locale: ptBR })}</span>
      <Icon name="arrowRight" className="w-6 text-red-500" onClick={nextDay} />
    </div>
  )
}