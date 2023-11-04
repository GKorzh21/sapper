import React from "react";

function Reset({ setSeconds, setStrTime, setCell_class, setBombCount, setTool, fieldOfBomb, setFieldOfBomb, fieldOfUI, setFieldOfUI, setStart, setLastClicked, setFirstCell}) {
    function resetFunc() {
        setBombCount(50)
        setTool('S')

        setFieldOfBomb(fieldOfBomb.map(i => {
            i.value = null
            return i
        }))

        setFieldOfUI(fieldOfUI.map(i => {
            console.log(i)
            i.value = null
            i.status = 2
            return i
        }))

        setStart(0)
        setFirstCell(null)
        setLastClicked(0)
        setStrTime('000')
        setSeconds(1)
        setCell_class('cell clear')
        document.querySelector(".field_wrap").style.borderColor = "rgb(178, 178, 178)"
    }

    return (
        <div
            className="reset"
            onClick={() => resetFunc()}
        >
            Reset
        </div>
    );
}

export default Reset;