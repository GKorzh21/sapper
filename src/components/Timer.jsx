import React from "react";
import { useEffect } from "react";

function Timer({start, seconds, setSeconds}) {
    function getTime() {
        let time = seconds
        setSeconds(time + 1);
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
    
        return () => clearInterval(interval);
    }, []);


    if(start == 0) {
        return (
            <div className="timer">
                00
            </div>
        );
    }

    if(start == 1) {
        return (
            <div className="timer">
                {seconds}
            </div>
        );
    }
}

export default Timer