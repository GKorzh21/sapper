import React from "react";

/* 
    Алгоритм функции вскрытия клеток:
    На вход получает начало, бомбы и интерфейс
    Создаем стэк, проверяем есть ли рядом с началом бомбы, если да, то пишем цифру и уходим,
    если бомб нет, то вскрываем клетку и закидываем в стэк все соседние клетки
*/

function Cell({cell_class, tool, bombCount, setBombCount, length, index, value, fieldOfBomb, setFieldOfBomb, fieldOfUI,  setFieldOfUI, start, setStart, lastClicked, setLastClicked, firstCell, setFirstCell}) {

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function returnNeighbors(lastClicked) {
        let neighbors = [];

        const up = []
        const down = []
        const left = []
        const right = []

        for(let i = 0; i < length; i++) {
            up.push(i * length)
            left.push(i)
            right.push(length * (length - 1) + i)
        }

        for(let i = 1; i < length; i++) {
            down.push(up[i]-1)
        }
        down.push(up[length-1] + length - 1)

        if(lastClicked === 0){
            neighbors.push(fieldOfBomb[lastClicked + length].index)
            neighbors.push(fieldOfBomb[lastClicked + 1].index)
            neighbors.push(fieldOfBomb[lastClicked + length + 1].index)
        }

        if(up.includes(lastClicked) && lastClicked != 0 && lastClicked != length * (length - 1)){
            neighbors.push(fieldOfBomb[lastClicked + length].index)
            neighbors.push(fieldOfBomb[lastClicked + 1].index)
            neighbors.push(fieldOfBomb[lastClicked + length + 1].index)
            neighbors.push(fieldOfBomb[lastClicked - length].index)
            neighbors.push(fieldOfBomb[lastClicked - length + 1].index)
        }  
        
        if(lastClicked === length * (length - 1)){
            neighbors.push(fieldOfBomb[lastClicked + 1].index)
            neighbors.push(fieldOfBomb[lastClicked - length].index)
            neighbors.push(fieldOfBomb[lastClicked - length + 1].index)
        } 

        if(right.includes(lastClicked) && lastClicked != length * (length - 1) && lastClicked != length * length - 1){
            neighbors.push(fieldOfBomb[lastClicked - 1].index)
            neighbors.push(fieldOfBomb[lastClicked + 1].index)
            neighbors.push(fieldOfBomb[lastClicked - length].index)
            neighbors.push(fieldOfBomb[lastClicked - length - 1].index)
            neighbors.push(fieldOfBomb[lastClicked - length + 1].index)
        } 

        if(lastClicked === length * length - 1){
            neighbors.push(fieldOfBomb[lastClicked - 1].index)
            neighbors.push(fieldOfBomb[lastClicked - length].index)
            neighbors.push(fieldOfBomb[lastClicked - length - 1].index)
        }

        if(down.includes(lastClicked) && lastClicked != length * length - 1 && lastClicked != length - 1){
            neighbors.push(fieldOfBomb[lastClicked - 1].index)
            neighbors.push(fieldOfBomb[lastClicked - length].index)
            neighbors.push(fieldOfBomb[lastClicked + length].index)
            neighbors.push(fieldOfBomb[lastClicked - length - 1].index)
            neighbors.push(fieldOfBomb[lastClicked + length - 1].index)
        } 

        if(lastClicked === length - 1){
            neighbors.push(fieldOfBomb[lastClicked - 1].index)
            neighbors.push(fieldOfBomb[lastClicked + length].index)
            neighbors.push(fieldOfBomb[lastClicked + length - 1].index)
        }

        if(left.includes(lastClicked) && lastClicked != 0 && lastClicked != length - 1){
            neighbors.push(fieldOfBomb[lastClicked - 1].index)
            neighbors.push(fieldOfBomb[lastClicked + 1].index)
            neighbors.push(fieldOfBomb[lastClicked + length].index)
            neighbors.push(fieldOfBomb[lastClicked + length - 1].index)
            neighbors.push(fieldOfBomb[lastClicked + length + 1].index)
        }

        if(!(up.includes(lastClicked)) && !(right.includes(lastClicked)) && !(down.includes(lastClicked)) && !(left.includes(lastClicked))){
            neighbors.push(fieldOfBomb[lastClicked - 1].index)
            neighbors.push(fieldOfBomb[lastClicked + 1].index)
            neighbors.push(fieldOfBomb[lastClicked + length].index)
            neighbors.push(fieldOfBomb[lastClicked - length].index)
            neighbors.push(fieldOfBomb[lastClicked + length - 1].index)
            neighbors.push(fieldOfBomb[lastClicked + length + 1].index)
            neighbors.push(fieldOfBomb[lastClicked - length - 1].index)
            neighbors.push(fieldOfBomb[lastClicked - length + 1].index)
        }

        return neighbors;
    }

    function fillBombField() {
        fieldOfBomb[lastClicked].value = 0

        let neighbors = returnNeighbors(lastClicked)

        for(let i = 0; i < neighbors.length; i++) {
            fieldOfBomb[neighbors[i]].value = 0
        }

        let prom_bomb_count = bombCount;

        while (prom_bomb_count > 0) {
            const prom_index = getRandomInt(length * length);
            if(fieldOfBomb[prom_index].value === null) {
                fieldOfBomb[prom_index].value = 1
                prom_bomb_count--
            }
            else {
                continue
            }
        }

        for(let i = 0; i < length * length; i++) {
            if(fieldOfBomb[i].value === null) {
                fieldOfBomb[i].value = 0
            }
        }

        setFieldOfBomb(fieldOfBomb.map(i => {
            return i;
        }))

        for(let i = 0; i < length; i++) {
            let prom = ''
            for(let j = 0; j < length; j++) {
                prom += String(fieldOfBomb[i + length * j].value) + ' '
            }

            console.log(prom + '\n')
        }
    }

    function countNeighborsBomb(index) {
        let neighbors = returnNeighbors(index)
        let count = 0

        for(let i = 0; i < neighbors.length; i++) {
            if(fieldOfBomb[neighbors[i]].value === 1) {
                count += 1
            }
        }

        return count;
    }

    function openCells(cellStack) {
        //если пользователь ткнул не на бомбу
        if(fieldOfBomb[lastClicked].value != 1) {
            let current = cellStack.pop()
            let current_count_bomb = countNeighborsBomb(current)
            let current_neighbors = returnNeighbors(current)

            if(current_count_bomb === 0) {
                fieldOfUI[current].value = null
                fieldOfUI[current].status = 0

                for(let i = 0; i < current_neighbors.length; i++) {
                    if(fieldOfUI[current_neighbors[i]].status === 2) {
                        cellStack.push(current_neighbors[i])
                        fieldOfUI[current_neighbors[i]].status = 1;
                    }
                }
            }
            else {
                fieldOfUI[current].value = current_count_bomb
                fieldOfUI[current].status = 0
            }

            if(cellStack.length != 0) {
                openCells(cellStack)
            } 
            else {
                return;
            }
        }

        setFieldOfUI(fieldOfUI.map(i => {
            return i;
        }))
    }

    function setFlag() {
        if(fieldOfUI[lastClicked].status === 2 && bombCount > 0) {
            fieldOfUI[lastClicked].value = 'F'
            fieldOfUI[lastClicked].status = 0
            setBombCount(bombCount - 1)

            let all_fill = 1
            for(let i = 0; i < length * length; i++) {
                if(fieldOfUI[i].status === 2) {
                    all_fill = 0
                    break
                }
            }

            if(all_fill === 1 && bombCount === 1) {
                setStart(3)
                document.querySelector(".field_wrap").style.borderColor = "rgb(0, 255, 47)"
            }

            setFieldOfUI(fieldOfUI.map(i => {
                return i;
            }))

            return;
        }

        if(fieldOfUI[lastClicked].value === 'F') {
            fieldOfUI[lastClicked].value = null
            fieldOfUI[lastClicked].status = 2
            setBombCount(bombCount + 1)

            setFieldOfUI(fieldOfUI.map(i => {
                return i;
            }))

            return;
        }
    }

    function openCurrentCell() {
        //Если клетка не вскрыта
        if(fieldOfUI[lastClicked].status === 2) {
            //Пользователь тыкает не на бомбу
            if(fieldOfBomb[lastClicked].value != 1) {
                //Рядом с ней есть бомбы
                if(countNeighborsBomb(lastClicked) != 0) {
                    fieldOfUI[lastClicked].value = countNeighborsBomb(lastClicked)
                }
                //Рядом с ней нет бомб
                else {
                    fieldOfUI[lastClicked].value = 0
                }
                //меняем статус на "вскрытая"
                fieldOfUI[lastClicked].status = 0


                let all_fill = 1
                for(let i = 0; i < length * length; i++) {
                    if(fieldOfUI[i].status === 2) {
                        all_fill = 0
                        break
                    }
                }

                if(all_fill === 1 && bombCount === 0) {
                    setStart(3)
                    document.querySelector(".field_wrap").style.borderColor = "rgb(0, 255, 47)"
                }
            }
            //Пользователь тыкает на бомбу
            else {
                //Пользователь проиграл
                setStart(2)
                document.querySelector(".field_wrap").style.borderColor = "rgb(255, 0, 0)"

                for(let i = 0; i < length * length; i++) {
                    //Если клетка не вскрыта
                    if(fieldOfUI[i].status != 0) {
                        //Под этой клеткой бомба
                        if(fieldOfBomb[i].value === 1) {
                            fieldOfUI[i].value = '*'
                            fieldOfUI[i].status = 0

                            if(lastClicked === i) {
                                fieldOfUI[i].status = 3
                            }
                        }
                    }
                    //Если клетка вскрыта
                    if(fieldOfUI[i].status === 0) {
                         if(fieldOfUI[i].value === 'F' && fieldOfBomb[i].value != 1) {
                            fieldOfUI[i].status = 3
                         }
                    }
                }
            }
        }

        setFieldOfUI(fieldOfUI.map(i => {
            return i;
        }))
    }

    function cellMouseDown() {
        if(start === 0 || start === 1) {
            document.getElementById(index).style.borderColor = "rgb(223, 223, 223)"
        }
        setLastClicked(index)
    }

    function cellMouseUp() {
        if(start === 0) {
            let cellStack = [];
            cellStack.push(lastClicked)

            if(firstCell === null) {
                setFirstCell(lastClicked)
                fillBombField()
            }

            openCells(cellStack)
            setStart(1)
        }

        if(start === 1) {
            if(tool === 'S') {
                openCurrentCell()
            }

            if(tool === 'F') {
                setFlag()
            }
        }

    }

    if(fieldOfUI[index].status === 0) {
        cell_class += ' pressed_cell'
        cell_class.replace(' nomal_cell', '')
    }

    if(fieldOfUI[index].status === 2) {
        cell_class.replace(' pressed_cell', '')
        cell_class += ' nomal_cell'
    }

    if(fieldOfUI[index].status === 3) {
        cell_class += ' fatal_bomb'
    }

    if(value === 1) {
        cell_class += ' n_1'
    }
    if(value === 2) {
        cell_class += ' n_2'
    }
    if(value === 3) {
        cell_class += ' n_3'
    }
    if(value === 4) {
        cell_class += ' n_4'
    }
    if(value === 5) {
        cell_class += ' n_5'
    }
    if(value === 6) {
        cell_class += ' n_6'
    }
    if(value === 7) {
        cell_class += ' n_7'
    }
    if(value === 8) {
        cell_class += ' n_8'
    }

    return (
        <div
            id={index}
            className={cell_class}
            onMouseDown={() => cellMouseDown()}
            onMouseUp={() => cellMouseUp()}
        >{value}</div>
    );
}

export default Cell;