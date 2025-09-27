'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Tag } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  category: string;
  address: string;
  photo_url: string | null;
}

interface StoreListProps {
  stores: Store[];
}

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const StoreList = ({ stores }: StoreListProps) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {stores.map((store) => (
        <motion.div
          key={store.id}
          variants={itemVariants}
          transition={{ type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.03, y: -5 }}
        >
          <Link href={`/stores/${store.id}`} className="block h-full">
            <Card className="h-full bg-secondary border-border/60 hover:border-primary/50 transition-colors duration-300 flex flex-col overflow-hidden">
              <div className="relative aspect-video w-full">
                {store.photo_url && (
                  <Image
                    src={store.photo_url}
                    alt={store.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
              <div className="flex flex-col flex-grow p-6">
                <CardTitle className="text-xl mb-3">{store.name}</CardTitle>
                <div className="flex-grow space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>{store.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{store.address}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StoreList;