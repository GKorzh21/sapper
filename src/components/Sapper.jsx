import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import Tool from "./Tool";
import Reset from "./Reset";
import Timer from "./Timer";

function Sapper() {
    const [lastClicked, setLastClicked] = useState(0);
    const [firstCell, setFirstCell] = useState(null);
    const [bombCount, setBombCount] = useState(50);
    const [cell_class, setCell_class] = useState('cell clear')
    const [seconds, setSeconds] = useState(0)
    const length = 16

    function generateFieldBomb(length) {
        const field = [];
        for (let i = 0; i < length * length; i++) {
          field.push({ index: i, value: null });
        }
        return field;
    }

    function generateFieldUI(length) {
        const field = [];
        for (let i = 0; i < length * length; i++) {
          field.push({ index: i, value: null, status: 2 });
        }
        return field;
    }

    const [fieldOfBomb, setFieldOfBomb] = useState(generateFieldBomb(length));
    const [fieldOfUI, setFieldOfUI] = useState(generateFieldUI(length)); 

    //s = shovel, f = flag
    const [tool, setTool] = useState('S');
    const [start, setStart] = useState(0);

    let rows = []
    for(let i = 0; i < length; i++) {
        let row = []
        for (let j = 0; j < length; j++) {
            row.push(<Cell
                key={i * length + j}
                cell_class={cell_class}
                setCell_class={setCell_class}
                bombCount={bombCount}
                setBombCount={setBombCount}
                length={length}
                tool={tool}
                index={i * length + j}
                value={fieldOfUI[i * length + j].value}
                fieldOfBomb={fieldOfBomb}
                setFieldOfBomb={setFieldOfBomb}
                fieldOfUI={fieldOfUI}
                setFieldOfUI={setFieldOfUI} 
                start={start}
                setStart={setStart} 
                lastClicked={lastClicked} 
                setLastClicked={setLastClicked} 
                firstCell={firstCell} 
                setFirstCell={setFirstCell} 
            />
            )
        }

        rows.push(<div
                    className="line"
                    key={i}
                >{row}</div>);
    }

    const onKey = (event) => {
        if (event.key === "c" || event.key === "с") {
            if(tool == 'S') {
                setTool('F')
            }
            if(tool == 'F') {
                setTool('S')
            }
        }

        console.log('a')
    }

    useEffect(() => {
        document.addEventListener("keydown", onKey)
        return () => {
            document.removeEventListener("keydown", onKey)
        }
    }, [])
    
    return (
        <div className="game" >
            <div className="panel">
                <Reset cell_class={cell_class} setCell_class={setCell_class} setTool={setTool} length={length} bombCount={bombCount} setBombCount={setBombCount} tool={tool} fieldOfBomb={fieldOfBomb} setFieldOfBomb={setFieldOfBomb} fieldOfUI={fieldOfUI} setFieldOfUI={setFieldOfUI} start={start} setStart={setStart} lastClicked={lastClicked} setLastClicked={setLastClicked} firstCell={firstCell} setFirstCell={setFirstCell}/>    
                <div className="bomb_count">
                    {bombCount}
                </div>
                <Timer start={start} seconds={seconds} setSeconds={setSeconds}/>
                <Tool tool={tool} setTool={setTool}/>
            </div>
            <div className="field_wrap">
                {rows}
            </div>
        </div>
    );
}

export default Sapper;