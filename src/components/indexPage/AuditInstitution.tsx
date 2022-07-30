import Image from 'next/image'
import React from 'react'

export function AuditInstitution() {
  return (
    <div className='flex flex-col items-center space-y-20 mb-32 lg:mb-40 '>
        <div className='text-4xl font-bold'>Audit Institution</div>
        <div className='px-7 bg-[#080E2D] rounded-lg py-[2px] flex items-center scale-105'>
            <Image src="/assets/icons/peckShield.png" className=' object-contain' height={70} width={200} alt="pecShield" /> 
        </div>
    </div>
  )
}
