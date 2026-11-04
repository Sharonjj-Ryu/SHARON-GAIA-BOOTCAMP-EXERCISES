import  { useParams } from 'react-router-dom';

const users = {
    1: { name: 'Dave Darrell', age: 23, status: "Complicated" },
    2: { name: 'Sharon June Martin', age: 30, status: "Single" },
    3: { name: 'Hashim', age: 20, status: "Taken" },
};

function UserProfile() {
    const { id } = useParams();
    const userId = id || '1';
    const user = users[userId];

    if (!user) {
        return <p>User Not Found!</p>;
    }

    return (
        <section>
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Status: {user.status}</p>
        </section>
    );
}

export default UserProfile;
