import { useEffect, useState } from 'react';

const API_BASE = 'https://jsonplaceholder.typicode.com';

const getUserKey = (user, index) => {
  if (user?.id != null) {
    return `${user.id}-${user.email ?? index}`;
  }

  return `${user?.name ?? 'user'}-${user?.email ?? index}`;
};

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
  });
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
  const [editingUser, setEditingUser] = useState(null);

  const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  useEffect(() => {
    let isActive = true;

    const loadUsers = async () => {
      setLoading((prev) => ({ ...prev, fetch: true }));
      setError(null);

      try {
        const userData = await apiCall('/users');
        if (isActive) {
          setUsers(userData);
        }
      } catch (err) {
        if (isActive) {
          setError(`Failed to fetch users: ${err.message}`);
        }
      } finally {
        if (isActive) {
          setLoading((prev) => ({ ...prev, fetch: false }));
        }
      }
    };

    void loadUsers();

    return () => {
      isActive = false;
    };
  }, []);

  const createUser = async (userData) => {
    setLoading((prev) => ({ ...prev, create: true }));
    setError(null);

    try {
      const createdUser = await apiCall('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      const userWithId = {
        ...userData,
        id: createdUser.id ?? Date.now(),
      };

      setUsers((prev) => {
        const maxId = prev.reduce((highest, current) => Math.max(highest, Number(current.id) || 0), 0);
        return [...prev, { ...userWithId, id: createdUser.id ?? maxId + 1 }];
      });
      setNewUser({ name: '', email: '', role: 'user' });
      return userWithId;
    } catch (err) {
      setError(`Failed to create user: ${err.message}`);
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  const updateUser = async (userData) => {
    setLoading((prev) => ({ ...prev, update: true }));
    setError(null);

    try {
      const updatedUser = await apiCall(`/users/${userData.id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });

      setUsers((prev) =>
        prev.map((user) => (user.id === userData.id ? { ...updatedUser, ...userData } : user)),
      );
      setEditingUser(null);
      return updatedUser;
    } catch (err) {
      setError(`Failed to update user: ${err.message}`);
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  };

  const deleteUser = async (id) => {
    setLoading((prev) => ({ ...prev, delete: true }));
    setError(null);

    try {
      await apiCall(`/users/${id}`, {
        method: 'DELETE',
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
      if (editingUser?.id === id) {
        setEditingUser(null);
      }
    } catch (err) {
      setError(`Failed to delete user: ${err.message}`);
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newUser.name.trim() || !newUser.email.trim()) {
      setError('Name and email are required.');
      return;
    }

    try {
      if (editingUser) {
        await updateUser({ ...editingUser, ...newUser });
      } else {
        await createUser(newUser);
      }
    } catch {
      // Error already stored by the action function.
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, email: user.email, role: user.role || 'user' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem' }}>
      <h2>User Management</h2>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
        />
        <select name="role" value={newUser.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
        </select>

        <button type="submit" disabled={loading.create || loading.update}>
          {editingUser ? 'Update user' : 'Add user'}
        </button>
      </form>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {loading.fetch ? (
        <p>Loading users...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user, index) => (
            <li
              key={getUserKey(user, index)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 0',
                borderBottom: '1px solid #ddd',
              }}
            >
              <div>
                <strong>{user.name}</strong>
                <div>{user.email}</div>
                <small>{user.role || 'user'}</small>
              </div> 

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button type="button" onClick={() => deleteUser(user.id)} disabled={loading.delete}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserManagement;