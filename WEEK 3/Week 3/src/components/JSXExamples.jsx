function JSXExamples() {
  const name = 'React Developer';
  const isLearning = true;
  const hobbies = ['Brisk walk', 'Jogging', 'Cooking'];

  return (
    <div>
      <h1>My name is {name}!</h1>

      <p>{isLearning ? 'Currently learning React' : 'React expert'}</p>

      <div className="skill-container">
        <h3>Hobbies:</h3>

        <ul>
          {hobbies.map((hobby, index) => (
            <li key={`${hobby}-${index}`}>{hobby}</li>
          ))}
        </ul>
      </div>

      <img src="/vite.svg" alt="Vite logo" />
      <br />
      <hr />
    </div>
  );
}

export default JSXExamples;