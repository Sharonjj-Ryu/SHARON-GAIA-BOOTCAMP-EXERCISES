import { useState, useEffect } from 'react';

const mockUsers = {
  1: {
    id: 1,
    name: 'Sharon June',
    email: 'sharonjune@example.com',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfPMHBjNxSXjI_Bcv7U3pWnZisTipMSeMfWaPvcgtOq0B9a0pJUfFTHnk&s=10',
    bio: 'Frontend developer and React enthusiast.',
  },
  2: {
    id: 2,
    name: 'Dave Darrell',
    email: 'davedarrell@example.com',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSudnwhyGVSq12pG8YNioifJwj4h4W9OkQ3xiszmqeEtCY3r8-E0sKSvjM&s=10',
    bio: 'Product designer focused on simple, elegant solutions.',
  },
};

const mockPosts = {
  1: [
    { id: 1, title: 'My first Post', content: 'Async/await is great!', date: '2024-01-15' },
    { id: 2, title: 'React Tips', content: 'useEffect is powerful!', date: '2024-01-26' },
  ],
  2: [{ id: 3, title: 'JavaScript Tricks', content: 'Async/await is great!', date: '2024-01-17' }],
};

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState({ user: false, posts: false });
  const [error, setError] = useState({ user: null, posts: null });

  useEffect(() => {
    if (!userId) {
      setUser(null);
      setPosts([]);
      setError({ user: null, posts: null });
      return undefined;
    }

    const controller = new AbortController();

    const fetchUserProfile = async () => {
      setLoading((prev) => ({ ...prev, user: true }));
      setError((prev) => ({ ...prev, user: null }));

      try {
        await new Promise((resolve) => setTimeout(resolve, 600));

        if (controller.signal.aborted) {
          return;
        }

        const selectedUser = mockUsers[userId];
        if (!selectedUser) {
          throw new Error('User not found');
        }

        setUser(selectedUser);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError((prev) => ({ ...prev, user: err.message }));
        }
      } finally {
        setLoading((prev) => ({ ...prev, user: false }));
      }
    };

    const fetchUserPosts = async () => {
      setLoading((prev) => ({ ...prev, posts: true }));
      setError((prev) => ({ ...prev, posts: null }));

      try {
        await new Promise((resolve) => setTimeout(resolve, 450));

        if (controller.signal.aborted) {
          return;
        }

        setPosts(mockPosts[userId] || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError((prev) => ({ ...prev, posts: err.message }));
        }
      } finally {
        setLoading((prev) => ({ ...prev, posts: false }));
      }
    };

    fetchUserProfile();
    fetchUserPosts();

    return () => {
      controller.abort();
    };
  }, [userId]);

  useEffect(() => {
    if (user) {
      document.title = `Profile: ${user.name}`;
    } else {
      document.title = 'User Profile';
    }

    return () => {
      document.title = 'React App';
    };
  }, [user]);

  if (!userId) {
    return (
      <div className="user-profile">
        <p>Please select a user to view their profile.</p>
      </div>
    );
  }

  if (loading.user) {
    return <div className="user-profile">Loading user profile...</div>;
  }

  if (error.user) {
    return <div className="user-profile">Error: {error.user}</div>;
  }

  if (!user) {
    return <div className="user-profile">No user found.</div>;
  }

  return (
    <div className="user-profile" style={{ maxWidth: '700px', margin: '20px auto', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <h2 style={{ margin: 0 }}>{user.name}</h2>
          <p style={{ margin: '6px 0' }}>{user.email}</p>
          <p style={{ margin: 0 }}>{user.bio}</p>
        </div>
      </div>

      <div>
        <h3>Posts</h3>
        {loading.posts ? (
          <p>Loading posts...</p>
        ) : error.posts ? (
          <p>Error: {error.posts}</p>
        ) : posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {posts.map((post) => (
              <li key={post.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                <h4 style={{ margin: '0 0 8px' }}>{post.title}</h4>
                <p style={{ margin: '0 0 8px' }}>{post.content}</p>
                <small>{post.date}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserProfile;