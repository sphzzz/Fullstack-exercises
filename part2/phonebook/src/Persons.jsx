import Person from './Person.jsx'
const Persons = ({ personsToShow }) => {
    return (
      <ul>
        {personsToShow.map((person, index) => (
          <Person key={index} person={person} />
        ))}
      </ul>
    )
  }
export default Persons  