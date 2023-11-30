import { fetchLatestInvoices, fetchRevenue } from '../lib/data';
import { Card } from '../ui/dashboard/cards';
import RevenueChart from '../ui/dashboard/revenue-chart';
import { luisitana } from '../ui/font';
import { LatestInvoice } from '../lib/definitions';
import LatestInvoices from '../ui/dashboard/latest-invoices';
import { Suspense } from 'react';
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from '../ui/skeletons';

export default async function Page() {
  return (
    <main>
      <h1 className={`${luisitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected"/> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" />*/}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/*
                <Card 
              title="Total Customers"
              value={numberOfCustomers}
              type="customers"
            />  */}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {/* aplicabndo suspense para renderizar por componente */}
          <Suspense fallback={RevenueChartSkeleton()}>
            {/* <RevenueChart revenue={revenue}/> ya no recibira props ´por que el fetch se permite desde el componente */}
            <RevenueChart />
          </Suspense>
          <Suspense fallback={LatestInvoicesSkeleton()}>
            <LatestInvoices />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
