import { Facebook, Instagram, Github, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <div className="w-full h-fit bg-gray400">
      <div className="py-8 px-12 flex justify-center items-center gap-4">
        <Button variant="ghost">
          <Facebook />
        </Button>
        <Button variant="ghost">
          <Instagram />
        </Button>
        <Button variant="ghost">
          <Github />
        </Button>
        <Button variant="ghost">
          <Youtube />
        </Button>
      </div>
      <address className="text-center pb-8 font-light">ⓒ 2024 TEAM-7. ALL RIGHTS RESERVED.</address>
    </div>
  );
};

export default Footer;
