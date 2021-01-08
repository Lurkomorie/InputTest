import {useEffect, useRef, useState} from "react";
import useOnClick from "../../utils/useOnClick";
import Button from "../ui/Button";

const NameChangeModal = ({toggleModal, showModal, activeInput, saveChanges}) => {
    const [input, setInput] = useState({});

    useEffect(() => {
        setInput(activeInput);

        return () => {
            setInput({});
        }
    }, [activeInput])

    const ref = useRef();
    useOnClick(ref, () => toggleModal(false));

    const handleChange = (e) => {
        setInput({...input, name: e.target.value});
    }

    return (
        showModal  && (
            <div className="modal">
                <div className="content" ref={ref}>
                    <input type="text" className="input" id={ input.id } value={ input.name } onChange={handleChange}/>
                    <div className="buttons">
                        <Button color="white" onClick={() => toggleModal(false)}>Cancel</Button>
                        <Button onClick={() => saveChanges(input)}>Save</Button>
                    </div>
                </div>
            </div>)
    )
}


export default NameChangeModal;