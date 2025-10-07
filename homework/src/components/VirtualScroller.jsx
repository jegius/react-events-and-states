import { useState, useEffect } from "react";
import { selectFooterHeight } from "../store/selectors";
import { useSelector } from "react-redux";

export function VirtualScroller({
    rowHeight,
    renderRow,
    nodePadding = 12,
    list = []
}) {
    // Состояние для текущей позиции прокрутки
    const [scrollTop, setScrollTop] = useState(0);
    // Длина списка
    const listLength = list.length;
    // Получаем элемент viewport из DOM
    const viewport = document.querySelector('.viewport');
    // Получаем высоту футера из Redux
    const footerHeight = useSelector(selectFooterHeight);
    // Состояние для высоты viewport
    const [height, setHeight] = useState(window.innerHeight - 79 - footerHeight);

    // Обработчик прокрутки
    function scroller(){
        console.log('scrolling, scrollTop:', viewport.scrollTop);
        setScrollTop(viewport ? viewport.scrollTop : 0);
    }

    // Прокрутка к низу списка
    function scrollToBottom(){
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
            setScrollTop(viewport.scrollTop);
        }
    }

    // Заполнение видимых элементов (виртуализация)
    function populateVisibleNodes(visibleNodesCount, startNode, list, renderRow){
        const nodes = []; 
            // Рендерим только видимую часть списка
            console.log('Rendering from', startNode, 'to', startNode + visibleNodesCount);
            for (let i = 0; i < visibleNodesCount; i++){
                nodes.push(renderRow(startNode + i, list));
            }
            console.log(nodes);
            return nodes
    }

    // Прокручиваем вниз при изменении списка
    useEffect(() => {
        scrollToBottom();
    }, [list])

    // Пересчитываем высоту viewport при изменении футера
    useEffect(() => {
        const newHeight = window.innerHeight - 79 - footerHeight;
        if (viewport) {
            viewport.scrollTop -= (newHeight - height);
        }
        setHeight(newHeight);
    }, [footerHeight])

    // Общая высота списка
    const totalHeight = listLength * rowHeight;

    // Индекс первого видимого элемента
    const startNode = (Math.max(0, Math.floor(scrollTop / rowHeight) - nodePadding))

    // Количество видимых элементов
    const visibleNodesCount = Math.min(listLength - startNode, Math.ceil(height / rowHeight) + 2 * nodePadding);

    // Смещение по Y для виртуализации
    const offsetY = startNode * rowHeight;

    // Массив видимых элементов
    const visibleNodes = populateVisibleNodes(visibleNodesCount, startNode, list, renderRow);

    // Основной рендер компонента
    return <div className="viewport" style= {{height: `${height}px`, overflow: "auto", alignContent: "end"}} onScroll={() => scroller()} >
        <div style={{height: totalHeight+"px", overflow: "hidden"}}>
            <div style={{transform: `translateY(${offsetY}px)`}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                    {visibleNodes}
                </div>
            </div>
        </div>
    </div>
}