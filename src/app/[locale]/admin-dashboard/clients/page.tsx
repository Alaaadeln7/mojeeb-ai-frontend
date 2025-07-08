"use client";
import { useState } from "react";
import CreateNewClientModal from "./CreateNewClientModal";
import ClientsHeader from "./ClientsHeader";
import ClientsTableSkeleton from "@/components/skeletons/ClientsTableSkeleton";
import ClientTable from "./ClientTable";
import TablePaginationSkeleton from "@/components/skeletons/TablePaginationSkeleton";
import PaginationTable from "./PaginationTable";
import useClient from "@/hooks/useClient";
export default function Clients() {
  const [selectedClients, setSelectedClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    clients,
    getClientsLoading,
    totalPages,
    currentPage,
    handlePageChange,
  } = useClient();
  return (
    <>
      <section className="sm:mx-10 mx-2 my-5">
        <ClientsHeader
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
        {getClientsLoading ? (
          <ClientsTableSkeleton />
        ) : (
          <ClientTable
            selectedClients={selectedClients}
            setSelectedClients={setSelectedClients}
            clients={clients?.clients}
          />
        )}
        {getClientsLoading ? (
          <TablePaginationSkeleton />
        ) : (
          <PaginationTable
            totalPages={totalPages}
            page={currentPage}
            handlePageChange={handlePageChange}
          />
        )}
      </section>

      {isModalOpen && <CreateNewClientModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}
