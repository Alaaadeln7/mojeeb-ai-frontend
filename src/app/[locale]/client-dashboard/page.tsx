import RecentClients from "./RecentClients";
import UsingWarming from "./UsingWarming";

export default function ClientDashboard() {
  return (
    <section className="mb-20 sm:mx-10 mx-2">
      {/* <Overview cards={overviewData} /> */}
      <div className=" grid sm:grid-cols-4 grid-cols-1 md:grid-cols-4 gap-4 mt-5">
        <RecentClients />
        <UsingWarming />
      </div>
    </section>
  );
}
