export interface Client {
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
