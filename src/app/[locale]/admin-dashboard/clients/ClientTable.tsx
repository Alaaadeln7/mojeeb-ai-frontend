import { Bell, CircleX, Ellipsis, TriangleAlert } from "lucide-react";
import formatDate from "@/utils/formatDate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface Client {
  _id: string;
  id?: string;
  name?: string;
  email?: string;
  sector?: string;
  industry?: string;
  isActive?: boolean;
  status?: string;
  users?: number;
  startDate?: string | Date;
  createdAt?: string | Date;
}

interface ClientTableProps {
  selectedClients?: string[];
  setSelectedClients?: (ids: string[]) => void;
  clients?: Client[];
  isLoading?: boolean;
  error?: Error | null;
}

export default function ClientTable({
  selectedClients = [],
  setSelectedClients = () => {},
  clients = [],
  isLoading = false,
  error = null,
}: ClientTableProps) {
  const handleSelectClient = (clientId: string) => {
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = clients.map((client) => client._id);
      setSelectedClients(allIds);
    } else {
      setSelectedClients([]);
    }
  };

  const isSelected = (id: string) => selectedClients.includes(id);

  if (isLoading) {
    return (
      <div className="w-full mt-10 flex justify-center">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    );
  }

  console.log(clients);
  if (error) {
    return (
      <Alert variant="destructive" className="w-full mt-10">
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Error loading clients: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!clients || clients.length === 0) {
    return (
      <Alert variant="default" className="w-full mt-10">
        <Bell className="h-4 w-4" />
        <AlertTitle>Notice</AlertTitle>
        <AlertDescription>No clients found</AlertDescription>
      </Alert>
    );
  }

  const allSelected =
    selectedClients.length === clients.length && clients.length > 0;

  return (
    <div className="w-full mt-10">
      {/* Desktop Table */}
      <Card className="hidden md:block overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  disabled={clients.length === 0}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client._id}
                className={isSelected(client._id) ? "bg-primary/10" : ""}
              >
                <TableCell>
                  <Checkbox
                    checked={isSelected(client._id)}
                    onCheckedChange={() => handleSelectClient(client._id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {client.name || "Unnamed Client"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {client.email || ""}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {client.sector || client.industry || "Unknown"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      client?.isActive
                        ? "default"
                        : client?.status === "trial"
                        ? "secondary"
                        : "destructive"
                    }
                    className="gap-1"
                  >
                    {client?.isActive ? (
                      <>
                        <Bell className="h-3 w-3" /> Active
                      </>
                    ) : client?.status === "trial" ? (
                      <>
                        <TriangleAlert className="h-3 w-3" /> Trial
                      </>
                    ) : (
                      <>
                        <CircleX className="h-3 w-3" /> Inactive
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>{client.users || 0}</TableCell>
                <TableCell>
                  {formatDate(client.startDate || client.createdAt) || "N/A"}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {clients.map((client) => (
          <Card
            key={client._id}
            className={`p-4 ${isSelected(client._id) ? "bg-primary/10" : ""}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isSelected(client._id)}
                  onCheckedChange={() => handleSelectClient(client._id)}
                  className="h-4 w-4"
                />
                <h3 className="font-medium">
                  {client.name || "Unnamed Client"}
                </h3>
              </div>
              <Badge
                variant={
                  client?.isActive
                    ? "default"
                    : client?.status === "trial"
                    ? "secondary"
                    : "destructive"
                }
                className="gap-1"
              >
                {client?.isActive ? (
                  <>
                    <Bell className="h-3 w-3" /> Active
                  </>
                ) : client?.status === "trial" ? (
                  <>
                    <TriangleAlert className="h-3 w-3" /> Trial
                  </>
                ) : (
                  <>
                    <CircleX className="h-3 w-3" /> Inactive
                  </>
                )}
              </Badge>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="font-semibold">Sector</p>
                <p className="text-muted-foreground">
                  {client.sector || client.industry || "Unknown"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Users</p>
                <p className="text-muted-foreground">{client.users || 0}</p>
              </div>
              <div>
                <p className="font-semibold">Start Date</p>
                <p className="text-muted-foreground">
                  {formatDate(client.startDate || client.createdAt) || "N/A"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-muted-foreground">{client.email || "N/A"}</p>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <Button variant="ghost" size="sm">
                <Ellipsis className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
