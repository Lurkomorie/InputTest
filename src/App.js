import './styles/global.css';
import {useEffect, useState} from "react";
import getInputs from "./utils/getInputs";
import NameChangeModal from "./components/modals/NameChangeModal";
import Header from "./components/header/Header";

function App() {
  const [inputs, setInputs] = useState([]);
  const [showModal, setModal] = useState(false);
  const [activeInput, setActiveInput] = useState({})

  const valueChange = (e) => {
      let tempArray = [...inputs];
      tempArray[e.target.id - 1] = {...tempArray[e.target.id - 1], value: e.target.value};
      setInputs(tempArray);
  }

  const clear = (id) => {
      let tempArray = [...inputs];
      tempArray[id - 1] = {...tempArray[id - 1], value: ''};
      setInputs(tempArray);
  }

  const clearAll = () => {
      let tempArray = [...inputs];
      tempArray.map(item => item.value = '');
      setInputs(tempArray);
  }

  async function sendData () {
      const data = {};
      let checked = false;
      inputs.map((item, index) => {
          if (item.value) {
              data['value' + index] = item.value;
              checked = true;
          }
      })

     if (checked) {
         fetch('localhost:3000/rest', {
             method: 'POST',
             body: JSON.stringify(data),
             headers: {
                 'Content-Type': 'application/json'
             }
         }).then(r => {
             console.log(r);
         }).catch(e => {
             alert(e);
         });
     } else {
         alert('No data to send')
     }
  }

  const toggleModal = (show, input) => {
       if (show) {
           setActiveInput({...input});
           setModal(show)
       } else {
           setActiveInput({});
           setModal(show);
       }
  }

  const saveChanges = (input) => {
      let tempArray = [...inputs];
      tempArray[input.id - 1] = input;
      setInputs(tempArray);
      toggleModal(false);
  }

  useEffect(() => {
      setInputs(getInputs(30));
  }, [])

  return (
    <div className="App">
      <Header clearAll={clearAll} sendData={sendData}/>
      <div className="row">
        {
          inputs && inputs.map(input => (
              <div className="wrapper">
                  <label className="label" id={ "label" + input.id } onClick={() => toggleModal(true, input)} htmlFor={ input.id }>{ input.name }</label>
                  <input type="text" className="input" id={ input.id } onChange={valueChange} value={ input.value }/>
                  { input.value && <span onClick={() => clear( input.id )}>&times;</span>}
              </div>
          ))
        }
      </div>
      {activeInput && <NameChangeModal showModal={showModal} toggleModal={toggleModal} activeInput={activeInput} saveChanges={saveChanges}/>}
    </div>
  );
}

export default App;
