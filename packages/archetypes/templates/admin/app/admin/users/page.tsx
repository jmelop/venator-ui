import { PageHeader } from '@venator-ui/patterns';
import {
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@venator-ui/ui';

type Role = 'Admin' | 'Editor' | 'Viewer';
type Status = 'Active' | 'Pending' | 'Disabled';

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
}

const users: User[] = [
  { id: 1, name: 'Alice Mercer', email: 'alice@acme.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Ben Hooper', email: 'ben@acme.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Clara Diaz', email: 'clara@acme.com', role: 'Viewer', status: 'Pending' },
  { id: 4, name: 'David Park', email: 'david@acme.com', role: 'Editor', status: 'Disabled' },
  { id: 5, name: 'Eva Lindqvist', email: 'eva@acme.com', role: 'Viewer', status: 'Active' },
];

const statusVariant: Record<Status, 'success' | 'warning' | 'error'> = {
  Active: 'success',
  Pending: 'warning',
  Disabled: 'error',
};

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage your team members and their access."
        actions={<Button variant="primary" size="sm">Invite user</Button>}
      />
      <Card>
        <CardContent className="pt-4 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Input placeholder="Search users…" className="max-w-xs" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-neutral-500">{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[user.status]}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
