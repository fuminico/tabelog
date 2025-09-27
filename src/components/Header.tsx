import Link from 'next/link';
import { Button } from './ui/button';
import { UtensilsCrossed } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">Tabelog Clone</span>
        </Link>
        <nav>
          <Link href="/stores/new" passHref>
            <Button variant="outline">店舗を登録</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;