'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const WAIT_BETWEEN_CHANGE = 300;

export default function Search({ placeholder }: { placeholder: string }) {
  // obtengo los params de url
  const searchParams = useSearchParams();
  //path por ejemplo /dashboard/invoices
  const pathName = usePathname();
  // traigo el metodo replace de useRouter
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log('searchParams', searchParams);

    // console.log(searchParams.get('query'));
    // obtengo los params pasandole lo que lo que obtengo en la url y me permite modificarlo
    const params = new URLSearchParams(searchParams);
    console.log('params.toString() =>', params.toString());

    if (term) {
      // si el usuario est escribiendo en el input setea el campo search y ponle el termino
      params.set('query', term);
    } else {
      // si el input esta vacio borra el campo search de la url
      params.delete('query');
    }

    params.set('page', '1');
    // esto me devuelve query=term
    console.log('pathName', pathName);
    console.log('params to string', params.toString());

    //  patname seria /dashboard/invoices y al unirla con el params.toString
    // quedaria /dashboard/invoices?query=aaaaa
    console.log('url nueva', `${pathName}?${params.toString()}`);
    replace(`${pathName}?${params.toString()}`);
  }, WAIT_BETWEEN_CHANGE);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={(event) => handleSearch(event.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
