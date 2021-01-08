import Button from "../ui/Button";

const Header = ({clearAll, sendData}) => {
    return (
        <div className="header">
            <div className="buttons">
                <Button color="white" onClick={() => clearAll()}>Clear All</Button>
                <Button onClick={() => sendData()}>Send All</Button>
            </div>
        </div>
    )
}

export default Header;