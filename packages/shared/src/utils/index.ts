import { APP_URL } from '../constants';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);
}

export function getTimeRemaining(expiration: string): string {
  const now = Date.now();
  const exp = new Date(expiration).getTime();
  const diff = exp - now;

  if (diff <= 0) return 'Expirado';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) return `${hours}h ${minutes}m restantes`;
  return `${minutes}m restantes`;
}

export function getRefLink(userId: string): string {
  return `${APP_URL}/ref/${userId}`;
}

export function generateShareText(negocioName: string, beneficio: string, userId: string): string {
  const refLink = getRefLink(userId);
  return `¡Aprovecha ${beneficio} en ${negocioName} con enplan! Únete aquí: ${refLink}`;
}
