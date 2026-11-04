import { useState } from 'react';
import { DotLottieReact} from "@lottiefiles/dotlottie-react";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const dismissNotification = (id) => {
        setNotifications((currentNotifications) =>
            currentNotifications.filter((notification) => notification.id !== id)
        );
    };

    const login = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate API call for user login
            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (Math.random() < 0.3) {
                setUser({
                    id: 1,
                    name: 'Sharon June Martin',
                    role: 'Admin',
                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
                });
                setNotifications([
                    { id: 1, message: 'Welcome back', type: 'success' },
                    { id: 2, message: 'You have 3 new messages.', type: 'info' }
                ]);
            } else {
                throw new Error('Login failed. Please try again.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="dashboard">
            <header>
                <h1>Dashboard</h1>
                {user ? (
                    <div className="user-info">
                        <img src={user.avatar} alt={user.name} className="avatar" />
                        <span> Welcome, {user.name}!</span>
                        <button onClick={() => setUser(null)}>Logout</button>
                    </div>
                ) : (
                    <button onClick={login} disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                )}
            </header>

            <main> 
                {error && (
                    <div className="error-banner">
                        <p> X {error} </p>
                        <button onClick={() => setError(null)}>Dismiss</button>
                    </div>
                )}
        {isLoading && (
            <div >
               <DotLottieReact
               src = "https://lottie.host/8283a307-b5ff-4e89-b6e4-2718d14a1cc8/5vhPXBhyxd.lottie"
               loop
               autoplay
               style={{width: "150px", heught: "150px"}}
               />
                
            </div>
        )}

        {user ? (<div className="dashboard-content">
            <h2> Welcome to your dashboard, {user.name}!</h2>
            {user.role === 'Admin' && (
                <div className="admin-panel">
                    <h3>Admin Controls</h3>
                    <button> Manage Users</button>
                    <button> vieW Analaytics  </button>
                    <button> System Settings  </button>
                </div>
            )}

            {notifications.length > 0 && (
                <div className="notifications">
                    <h3>Notifications ({notifications.length})</h3>
                    {notifications.map((notification) => (
                        <div key={notification.id} className={`notification ${notification.type}`}>
                            <p>{notification.message}</p>
                            <button onClick={() => dismissNotification(notification.id)}>Dismiss</button>
                        </div>
                    ))}
                </div>
            )}

            {notifications.length === 0 && (
                <p>No notifications to display.</p>
            )}
        </div>
        ) : (
            !isLoading && error && (
                <div className="welcome-message">
                    <h2>Welcome to the Dashboard</h2>
                    <p>Please log in to access your dashboard features.</p>
                    <h2> Click the Login button to get started.</h2>
                </div>
            )
        )} 

        </main>
        </div>
    );
}

export default Dashboard;