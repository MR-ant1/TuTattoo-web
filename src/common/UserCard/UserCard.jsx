import "./UserCard.css"

// eslint-disable-next-line react/prop-types
export const UserCard = ({ key, firstName, lastName, email }) => {

    return (
        <div className="userCardDesign" key={key}>
            <div>{firstName}</div>
            <div>{lastName}</div>
            <div>{email}</div>
        </div>
    )
}