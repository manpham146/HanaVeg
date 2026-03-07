'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import Image from 'next/image';

export default function BookingPage() {
  const t = useTranslations('Booking');
  const c = useTranslations('Common');
  const [persons, setPersons] = useState('2');
  const [time, setTime] = useState('18:00');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero banner */}
      <div className="relative h-[35vh] overflow-hidden">
        <Image src="/images/banner.jpg" fill alt="Booking" className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[10px] tracking-[0.3em] font-sans uppercase text-secondary mb-4">{t('label')}</p>
            <h1 className="text-4xl md:text-6xl font-serif text-background">{t('title')}</h1>
          </div>
        </div>
      </div>

      {/* Booking Form — light background */}
      <div className="container mx-auto px-6 lg:px-24 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl px-8 md:px-14 py-14">
          <p className="text-sm font-sans text-foreground/60 text-center mb-14 max-w-lg mx-auto leading-relaxed">
            {t('description')}
          </p>

          <form onSubmit={e => e.preventDefault()} className="space-y-10">
            {/* Row 1: Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Label variant="field" htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t('namePlaceholder')}
                />
              </div>
              <div>
                <Label variant="field" htmlFor="phone">{t('phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={t('phonePlaceholder')}
                />
              </div>
            </div>

            {/* Row 2: Persons + Time + Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Label variant="field">{t('persons')}</Label>
                <Select value={persons} onValueChange={setPersons}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('persons')} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8,10,12].map(n => (
                      <SelectItem key={n} value={n.toString()}>{n} {n === 1 ? c('person') : c('persons')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label variant="field">{t('time')}</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('time')} />
                  </SelectTrigger>
                  <SelectContent>
                    {['10:00','11:00','12:00','13:00','14:00','17:00','18:00','19:00','20:00','21:00'].map(h => (
                      <SelectItem key={h} value={h}>{h}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label variant="field" htmlFor="date">{t('date')}</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label variant="field" htmlFor="note">{t('note')}</Label>
              <Textarea
                id="note"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder={t('notePlaceholder')}
                rows={3}
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <Button variant="zen" className="px-16 py-6 text-sm w-full md:w-auto">
                {t('submit')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
