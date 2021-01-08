export default function getInputs( counter ) {
    const inputsArray = [];

    for (var i = 1; i <= counter; ++i) {
        const input = {
            value: '',
            name: `Input ${i}`,
            id: i,
        }

        inputsArray.push(input);
    }

    return inputsArray;
}