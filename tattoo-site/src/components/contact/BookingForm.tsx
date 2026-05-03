'use client';

import { useState, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Input, Textarea } from '@/components/ui/Input';

const HCAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? '';

export default function BookingForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const captchaRef = useRef<HCaptcha>(null);

  const [fields, setFields] = useState({
    name: '', email: '', phone: '', idea: '',
    size: '', placement: '', preferredDates: '',
  });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function setField(key: string, val: string) {
    setFields((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fields.name.trim()) newErrors.name = 'Required';
    if (!fields.email.trim()) newErrors.email = 'Required';
    if (!fields.idea.trim() || fields.idea.length < 10) newErrors.idea = 'Please provide more detail';
    if (!privacyConsent) newErrors.privacy = 'Required';
    if (!captchaToken) newErrors.captcha = t('captchaError');

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStatus('loading');

    try {
      const formData = new FormData();
      Object.entries(fields).forEach(([k, v]) => formData.append(k, v));
      formData.append('privacyConsent', 'true');
      formData.append('hcaptchaToken', captchaToken);
      if (referenceFile) formData.append('referenceImage', referenceFile);

      const res = await fetch('/api/contact', { method: 'POST', body: formData });

      if (res.ok) {
        setStatus('success');
        setFields({ name: '', email: '', phone: '', idea: '', size: '', placement: '', preferredDates: '' });
        setPrivacyConsent(false);
        setCaptchaToken('');
        captchaRef.current?.resetCaptcha();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="py-12 text-center">
        <p className="font-display italic text-3xl text-black mb-2">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input label={t('name')} value={fields.name} onChange={(e) => setField('name', e.target.value)} required error={errors.name} />
        <Input label={t('email')} type="email" value={fields.email} onChange={(e) => setField('email', e.target.value)} required error={errors.email} />
      </div>

      <Input label={t('phone')} type="tel" value={fields.phone} onChange={(e) => setField('phone', e.target.value)} />

      <Textarea label={t('idea')} value={fields.idea} onChange={(e) => setField('idea', e.target.value)} rows={5} required error={errors.idea} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input label={t('size')} value={fields.size} onChange={(e) => setField('size', e.target.value)} placeholder="e.g. 10×10 cm" />
        <Input label={t('placement')} value={fields.placement} onChange={(e) => setField('placement', e.target.value)} placeholder="e.g. forearm" />
      </div>

      <Input label={t('dates')} value={fields.preferredDates} onChange={(e) => setField('preferredDates', e.target.value)} placeholder="e.g. March–April, weekends" />

      {/* Reference image */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-widest text-black/60">{t('reference')}</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setReferenceFile(e.target.files?.[0] ?? null)}
          className="text-sm font-sans text-black/60 file:mr-4 file:py-2 file:px-4 file:border file:border-black/20 file:text-xs file:font-sans file:uppercase file:tracking-widest file:text-black file:bg-white hover:file:bg-black/5 file:cursor-pointer"
        />
      </div>

      {/* Privacy */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={privacyConsent}
          onChange={(e) => setPrivacyConsent(e.target.checked)}
          required
          className="mt-1 accent-red flex-shrink-0"
        />
        <span className="text-sm font-sans text-black/60 leading-relaxed">
          {t('privacy')}{' '}
          <Link href={`/${locale}/datenschutz`} className="underline hover:text-red transition-colors">
            {t('privacyLink')}
          </Link>{' '}
          {t('privacyEnd')}
        </span>
      </label>
      {errors.privacy && <p className="text-xs text-red -mt-4">{errors.privacy}</p>}

      {/* hCaptcha */}
      <div>
        <HCaptcha
          ref={captchaRef}
          sitekey={HCAPTCHA_SITE_KEY}
          onVerify={setCaptchaToken}
          onExpire={() => setCaptchaToken('')}
          theme="light"
        />
        {errors.captcha && <p className="text-xs text-red mt-1">{errors.captcha}</p>}
      </div>

      {status === 'error' && <p className="text-sm text-red">{t('error')}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-red text-white font-sans text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#a00d24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? '…' : t('submit')}
      </button>
    </form>
  );
}
