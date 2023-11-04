import React from "react"

function Tool({tool, setTool}) {
    function changeTool() {
        if(tool == 'S') {
            setTool('F')
        }
        else{
            setTool('S')
        }
    }

    return (
        <div
            className="tool_btn"
            onClick={() => changeTool()}
        >
            <p>{tool}</p>
        </div>
    );
}

export default Tool;