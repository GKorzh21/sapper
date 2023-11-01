import React from "react";

function Reset({cell_class, setCell_class, bombCount, setBombCount, length, tool, setTool, fieldOfBomb, setFieldOfBomb, fieldOfUI, setFieldOfUI, start, setStart, lastClicked, setLastClicked, firstCell, setFirstCell}) {
    function resetFunc() {
        setBombCount(50)
        setTool('S')

        for(let i = 0; i < length * length; i++) {
            fieldOfBomb[i].value = null
            fieldOfUI[i].value = null
            fieldOfUI[i].status = 2
        }

        setStart(0)
        setFirstCell(null)
        setLastClicked(0)
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