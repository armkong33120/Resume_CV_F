import { getProfile } from '@/lib/content';
import ContactContent from '@/components/ContactContent';

export default async function ContactPage() {
  const profile = await getProfile();

  return <ContactContent profile={profile} />;
}
