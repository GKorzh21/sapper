import React from "react";
import { useEffect } from "react";

function Timer({strTime, setStrTime, start, seconds, setSeconds}) {
    function getTime() {
        setSeconds(seconds + 1)

        if(Math.floor(seconds / 10) === 0) {
            setStrTime('00' + seconds)
            return
        }

        if(Math.floor(seconds / 100) === 0) {
            setStrTime('0' + seconds)
            return
        }

        setStrTime('' + seconds)
    }

    useEffect(() => {
        if(start === 1) {
            const interval = setInterval(() => getTime(), 1000);    
            return () => clearInterval(interval);
        }
    }, [seconds, start, strTime]);


    return (
        <div className="timer">
            {strTime}
        </div>
    );
}

export default Timer