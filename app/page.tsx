import { redirect } from 'next/navigation';

// Root page — redirect to Flowst8 or show 404
// In production, each client uses their own subdomain so this rarely shows
export default function Home() {
  redirect('https://flowst8.eu');
}
