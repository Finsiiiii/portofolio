import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Listbox } from '@headlessui/react';
import { HiCheck, HiArrowsUpDown } from 'react-icons/hi2';
import type { Variants } from 'framer-motion';

const sortOptions = ['date', 'views'] as const;

const variants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

export function SortListbox(): JSX.Element {
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  return (
    <Listbox value={sortOption} onChange={setSortOption}>
      {({ open }): JSX.Element => (
        <div className='relative ml-auto w-52'>
          <Listbox.Button
            className={clsx(
              'clickable relative w-full py-2 pl-3 pr-10 text-left text-sm',
              open && 'shadow-md'
            )}
          >
            <span className='block truncate'>Sort by {sortOption}</span>
            <i className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <HiArrowsUpDown className='h-5 w-5 text-gray-400' />
            </i>
          </Listbox.Button>
          <AnimatePresence mode='wait'>
            {open && (
              <Listbox.Options
                as={motion.ul}
                className='main-border absolute z-10 mt-2 max-h-60 w-full overflow-auto
                           rounded-md bg-white text-sm shadow-lg dark:bg-dark-background'
                {...variants}
                static
              >
                {sortOptions.map((option) => (
                  <Listbox.Option
                    className={({ active }): string =>
                      clsx(
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors 
                         hover:bg-blue-300/10 dark:hover:bg-blue-300/25`,
                        active && 'bg-blue-300/10 dark:bg-blue-300/25'
                      )
                    }
                    value={option}
                    key={option}
                  >
                    {({ selected }): JSX.Element => (
                      <>
                        <span
                          className={clsx(
                            'block truncate',
                            selected ? 'font-medium' : 'font-normal'
                          )}
                        >
                          Sort by {option}
                        </span>
                        {selected && (
                          <i
                            className='absolute inset-y-0 left-0 flex items-center pl-3 
                                       text-blue-500 dark:text-blue-300'
                          >
                            <HiCheck className='h-5 w-5' />
                          </i>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </AnimatePresence>
        </div>
      )}
    </Listbox>
  );
}
