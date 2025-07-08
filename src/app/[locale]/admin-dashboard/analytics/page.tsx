import AnalyticsHeader from "./AnalyticsHeader";
import AnalyticsOverview from "./AnalyticsOverview";
import { overviewData } from "@/data/AnalyticsData";
import CallsOverTime from "./CallsOverTime";
import TicketVolume from "./TicketVolume";
import Top5ActiveClients from "./Top5ActivesClients";
export default function Analytics() {
  return (
    <section className="sm:mx-10 mx-2 my-5">
      <AnalyticsHeader />
      <AnalyticsOverview data={overviewData} />
      <div className="rounded-lg mt-5 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
        <CallsOverTime />
        <TicketVolume />
      </div>
      <Top5ActiveClients />
    </section>
  );
}
