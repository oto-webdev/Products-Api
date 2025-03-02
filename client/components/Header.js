import Link from 'next/link';
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <div className='flex items-center justify-between px-2 sm:px-12 lg:px-28 py-4 shadow-sm fixed top-0 w-full bg-white'>
        <h2 className='sm:text-2xl font-bold text-lg'>
            <Link href={'/'}>Next Shop</Link>
        </h2>

        <Link href={'/create'}>
          <Button variant={'default'} className='cursor-pointer text-sm'>New product</Button>
        </Link>
    </div>
  );
};

export default Header;
