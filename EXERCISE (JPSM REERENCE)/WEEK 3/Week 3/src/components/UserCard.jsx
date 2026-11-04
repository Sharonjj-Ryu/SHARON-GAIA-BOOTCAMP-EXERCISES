function UserCard({ name = "Sharon", age = 30, isActive = false }) {
  return (
    <div>
      <h1> {name}</h1>
      <p>Age: {age}</p>
      <p>Status : {isActive ? "Active" : "Inactive"}</p>
    </div>
  );
}

export default UserCard;
