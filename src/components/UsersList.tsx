import React from 'react';
import usersData from '../data/users.json' with { type: 'json' };

type User = {
  id: string | number;
  name: string;
  role: string;
};

const users = usersData as unknown as User[];

export const UserList: React.FC = () => {
  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {/* 3. Map over the strongly-typed array */}
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.role}
          </li>
        ))}
      </ul>

    </div>
  );
};
