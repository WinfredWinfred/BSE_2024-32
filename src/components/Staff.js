import React from 'react'

const Staff = () => {
    const people = [
        {id: 1, name:"david hope",position:"director"},
        {id: 2, name:"micheal bolton",position:"ceo"},
        {id: 3, name:"indiana johns",position:"receptionist"},
        {id: 4, name:"john doe",position:"human resource manager"},
        {id: 5, name:"patick doe",position:"sales representative"}
    ]
    const style = {display:"grid", gridTemplateColumns:"repeat(3, 1fr)"}
    return (
        <div>
            <h2>Our Staff Members</h2>
            <div style={style}>
                {people && people.map(person => (
                    <div key={person.id}>
                        <p>Name: {person.name}</p>
                        <p>Position: {person.position}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Staff