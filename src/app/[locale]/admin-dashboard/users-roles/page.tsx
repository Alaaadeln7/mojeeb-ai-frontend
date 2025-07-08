"use client";
import { useState } from "react";
import UsersAndRolesHeader from "./UsersAndRolesHeader";
import useAuth from "@/hooks/useAuth";
import CreateUserModal from "./CreateUserModal";
import UsersTable from "./UsersTable";
import PaginationTable from "./PaginationTable";
import TablePaginationSkeleton from "@/components/skeletons/TablePaginationSkeleton";
export default function UsersAndRoles() {
  const { users, getUsersLoading, totalPages, currentPage, handlePageChange } =
    useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section className="sm:mx-10 mx-2 my-5">
        <UsersAndRolesHeader setIsModalOpen={setIsModalOpen} />
        <UsersTable users={users} getUsersLoading={getUsersLoading} />
        {getUsersLoading ? (
          <TablePaginationSkeleton />
        ) : (
          <PaginationTable
            totalPages={totalPages}
            page={currentPage}
            handlePageChange={handlePageChange}
          />
        )}
      </section>
      {isModalOpen && <CreateUserModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}
