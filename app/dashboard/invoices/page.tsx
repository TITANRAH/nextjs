import { CreateInvoice } from '@/app/ui/invoices/buttons';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';

import Table from '@/app/ui/invoices/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { luisitana } from '@/app/ui/font';
import { fetchInvoicesPages } from '@/app/lib/data';

export default async function InvoicesPage({
  // palabra reservada por eso puedo recuperarla
  
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // console.log('searchParams',searchParams?.query);
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  // console.log('query', query)

  // recibo el total de paginas segun la query 
  // esta funcion devuelve el total de rows encontradas con la query
 
 
  const totalPages = await fetchInvoicesPages(query)
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${luisitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense 
      key={query + currentPage} 
      fallback={<InvoicesTableSkeleton 
      />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* paginacion del 1 al 3 */}
        <Pagination totalPages={totalPages}/>
      </div>
    </div>
  );
}


// en invoice obtenemos la query y el numero de pagina 
// const query = searchParams?.query || '';
// const currentPage = Number(searchParams?.page) || 1;

// la pagina sera 1 o el numero que obtenga 
// estos datos se le enviam a la tabla

// ademas esta el componente search donde se realiza la construccion de la url 
// que leemos en invoice 

// tambien esta el componente paginacion que se le envia el total de paginas 
// que es un numero de filas que encuentra al realizar la query