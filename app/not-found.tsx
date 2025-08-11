'use client';

import { NotFoundError } from '../components/ui/ErrorComponents';

export default function NotFound() {
  return (
    <NotFoundError 
      title="Sayfa Bulunamadı"
      message="Aradığınız sayfa mevcut değil veya taşınmış olabilir. URL'yi kontrol edin veya ana sayfaya dönün."
    />
  );
}
