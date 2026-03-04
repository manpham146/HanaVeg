'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';

export default function BookingPage() {
  const t = useTranslations('Booking');
  const [persons, setPersons] = useState('2');
  const [time, setTime] = useState('18:00');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  return (
    <div className="min-h-screen bg-[#0F1F15] text-[#F6EFDF]">
      {/* Hero banner */}
      <div className="relative h-[40vh] overflow-hidden">
        <Image src="/images/banner.jpg" fill alt="Booking" className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-[#0F1F15]/70 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-[#A58A5C] mb-4">{t('label')}</p>
            <h1 className="text-4xl md:text-6xl font-serif text-[#F6EFDF]">{t('title')}</h1>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="container mx-auto px-6 lg:px-24 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-sans text-[#F6EFDF]/60 text-center mb-16 max-w-lg mx-auto leading-relaxed">
            {t('description')}
          </p>

          <form onSubmit={e => e.preventDefault()} className="space-y-10">
            {/* Row 1: Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#A58A5C]/70 block mb-3">{t('name')}</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t('namePlaceholder')}
                  className="w-full bg-transparent border-b border-[#A58A5C]/30 pb-3 font-sans text-sm outline-none placeholder:text-[#F6EFDF]/30 focus:border-[#A58A5C] transition-colors text-[#F6EFDF]"
                />
              </div>
              <div>
                <label className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#A58A5C]/70 block mb-3">{t('phone')}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={t('phonePlaceholder')}
                  className="w-full bg-transparent border-b border-[#A58A5C]/30 pb-3 font-sans text-sm outline-none placeholder:text-[#F6EFDF]/30 focus:border-[#A58A5C] transition-colors text-[#F6EFDF]"
                />
              </div>
            </div>

            {/* Row 2: Persons + Time + Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#A58A5C]/70 block mb-3">{t('persons')}</label>
                <select
                  value={persons}
                  onChange={e => setPersons(e.target.value)}
                  className="w-full bg-transparent border-b border-[#A58A5C]/30 pb-3 font-sans text-sm outline-none cursor-pointer text-[#F6EFDF] [&>option]:bg-[#0F1F15]"
                >
                  {[1,2,3,4,5,6,7,8,10,12].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'person' : 'persons'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#A58A5C]/70 block mb-3">{t('time')}</label>
                <select
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full bg-transparent border-b border-[#A58A5C]/30 pb-3 font-sans text-sm outline-none cursor-pointer text-[#F6EFDF] [&>option]:bg-[#0F1F15]"
                >
                  {['10:00','11:00','12:00','13:00','14:00','17:00','18:00','19:00','20:00','21:00'].map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#A58A5C]/70 block mb-3">{t('date')}</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full bg-transparent border-b border-[#A58A5C]/30 pb-3 font-sans text-sm outline-none text-[#F6EFDF] [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Row 3: Note */}
            <div>
              <label className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#A58A5C]/70 block mb-3">{t('note')}</label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder={t('notePlaceholder')}
                rows={3}
                className="w-full bg-transparent border-b border-[#A58A5C]/30 pb-3 font-sans text-sm outline-none placeholder:text-[#F6EFDF]/30 focus:border-[#A58A5C] transition-colors text-[#F6EFDF] resize-none"
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <Button className="bg-[#A58A5C] text-[#0F1F15] hover:bg-[#D5B67A] font-serif rounded-none px-16 py-6 text-sm tracking-widest">
                {t('submit')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
