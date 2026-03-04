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
    <div className="min-h-screen bg-[#FAF6EE]">
      {/* Hero banner */}
      <div className="relative h-[35vh] overflow-hidden">
        <Image src="/images/banner.jpg" fill alt="Booking" className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-[#0F1F15]/60 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-[#A58A5C] mb-4">{t('label')}</p>
            <h1 className="text-4xl md:text-6xl font-serif text-[#F6EFDF]">{t('title')}</h1>
          </div>
        </div>
      </div>

      {/* Booking Form — light background */}
      <div className="container mx-auto px-6 lg:px-24 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl px-8 md:px-14 py-14">
          <p className="text-sm font-sans text-[#0B1C10]/60 text-center mb-14 max-w-lg mx-auto leading-relaxed">
            {t('description')}
          </p>

          <form onSubmit={e => e.preventDefault()} className="space-y-10">
            {/* Row 1: Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#A58A5C] block mb-3 font-semibold">{t('name')}</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t('namePlaceholder')}
                  className="w-full bg-[#FAF6EE] border border-[#0B1C10]/15 rounded px-4 py-3 font-sans text-sm outline-none placeholder:text-[#0B1C10]/35 focus:border-[#A58A5C] focus:ring-1 focus:ring-[#A58A5C]/30 transition-all text-[#0B1C10]"
                />
              </div>
              <div>
                <label className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#A58A5C] block mb-3 font-semibold">{t('phone')}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={t('phonePlaceholder')}
                  className="w-full bg-[#FAF6EE] border border-[#0B1C10]/15 rounded px-4 py-3 font-sans text-sm outline-none placeholder:text-[#0B1C10]/35 focus:border-[#A58A5C] focus:ring-1 focus:ring-[#A58A5C]/30 transition-all text-[#0B1C10]"
                />
              </div>
            </div>

            {/* Row 2: Persons + Time + Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#A58A5C] block mb-3 font-semibold">{t('persons')}</label>
                <select
                  value={persons}
                  onChange={e => setPersons(e.target.value)}
                  className="w-full bg-[#FAF6EE] border border-[#0B1C10]/15 rounded px-4 py-3 font-sans text-sm outline-none cursor-pointer text-[#0B1C10] focus:border-[#A58A5C] focus:ring-1 focus:ring-[#A58A5C]/30 transition-all"
                >
                  {[1,2,3,4,5,6,7,8,10,12].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'person' : 'persons'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#A58A5C] block mb-3 font-semibold">{t('time')}</label>
                <select
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full bg-[#FAF6EE] border border-[#0B1C10]/15 rounded px-4 py-3 font-sans text-sm outline-none cursor-pointer text-[#0B1C10] focus:border-[#A58A5C] focus:ring-1 focus:ring-[#A58A5C]/30 transition-all"
                >
                  {['10:00','11:00','12:00','13:00','14:00','17:00','18:00','19:00','20:00','21:00'].map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#A58A5C] block mb-3 font-semibold">{t('date')}</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full bg-[#FAF6EE] border border-[#0B1C10]/15 rounded px-4 py-3 font-sans text-sm outline-none text-[#0B1C10] focus:border-[#A58A5C] focus:ring-1 focus:ring-[#A58A5C]/30 transition-all"
                />
              </div>
            </div>

            {/* Row 3: Note */}
            <div>
              <label className="text-[9px] tracking-[0.2em] font-sans uppercase text-[#A58A5C] block mb-3 font-semibold">{t('note')}</label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder={t('notePlaceholder')}
                rows={3}
                className="w-full bg-[#FAF6EE] border border-[#0B1C10]/15 rounded px-4 py-3 font-sans text-sm outline-none placeholder:text-[#0B1C10]/35 focus:border-[#A58A5C] focus:ring-1 focus:ring-[#A58A5C]/30 transition-all text-[#0B1C10] resize-none"
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <Button className="bg-[#A58A5C] text-white hover:bg-[#0F1F15] font-serif rounded-none px-16 py-6 text-sm tracking-widest transition-colors shadow-lg">
                {t('submit')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
