import Navbar from './Navbar';
import { getLifoIndexColors } from '@/lib/getSiteColors';

export default async function NavbarWithColors() {
  const { primaryColor, secondaryColor } = await getLifoIndexColors();

  return <Navbar primaryColor={primaryColor} secondaryColor={secondaryColor} />;
}
