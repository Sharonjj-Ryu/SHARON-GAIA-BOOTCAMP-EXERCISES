function PersonalInfo() {
  const name = "Sharon"
  const isLearning = true
  const hobbies = ["briskwalk", "Jogging", "Cooking"]
  const currentDate = new Date().toLocaleString();

  return (
    <div> 
    <h1> My name is, {name}!</h1>

    <p>{isLearning ? " My favourite programming Language is React" : "React expert"}</p>

    <div className="skill-container">
      <h3> Hobbies:</h3>


      <ul>
        {hobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>

        ))}
      </ul>

      <p>
        <strong>Current Date & Time: </strong> {currentDate}
      </p>

      <img
        src="https://bunbobae.com/wp-content/uploads/2019/09/IMG_3514-683x1024.jpg"
        alt="sauce chili"
        width="300"
        length="200"

      />
    </div>


    <br/>
    <hr />
    </div>
  )
}

export default PersonalInfo