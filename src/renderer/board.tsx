import React, { RefObject, useEffect, useRef, useState } from "react";
import { Button, Col, ConfigProvider, Input, InputRef, Progress, Row, Select, Typography } from "antd";
import { WordResult } from "../main/spellcast";
import { Board as LetterBoard, Index, BoardUtil } from "../main/board";
import { bestWord } from "../main/spellcast";

const boardUtil = new BoardUtil(5, 5)

interface LetterInputProps {
    index: number
    onChange: (value: string) => void
    refs: Map<number, RefObject<InputRef>>
    setSelectedIndex: (value: number | null) => void
    result: Map<number, WordResult>
    pathToShow: number | null
}

function LetterInput(props: LetterInputProps) {
    const {index, onChange, refs, setSelectedIndex, result, pathToShow} = props
    const [realVal, setRealVal] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        const reg = /^[A-Za-z]$/
        if (reg.test(inputValue) || inputValue === '') {
            setRealVal(inputValue.toUpperCase())
            onChange(inputValue.toLowerCase())
            if (inputValue !== '') {
                const next = refs.get(index + 1)
                if (next != undefined) {
                    next.current?.focus()
                }
            }
        }
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select()
        setSelectedIndex(index)
    }

    return (
        <Input
            style={pathToShow != null && result.get(pathToShow)?.path.includes(index) ? { background: "#FFF499" } : {}}
            className="letter-input"
            maxLength={1}
            tabIndex={index}
            onChange={handleChange}
            onFocus={handleFocus}
            value={realVal}
            ref={refs.get(index)}
        />
    )
}

interface LetterInputRowProps {
    row: number
    onChange: (value: string, index: number) => void
    refs: Map<number, RefObject<InputRef>>
    setSelectedIndex: (value: number | null) => void
    result: Map<number, WordResult>
    pathToShow: number | null
}

function LetterInputRow(props: LetterInputRowProps) {
    const {row, onChange, refs, setSelectedIndex, result, pathToShow} = props
    return (
        <div className="letter-input-row">
            {[...new Array(5).keys()].map(
                c => {
                    const ord = boardUtil.indexToOrder([row, c])
                    return <LetterInput 
                        index={ord} 
                        onChange={s => onChange(s, ord)} 
                        refs={refs}
                        setSelectedIndex={setSelectedIndex}
                        result={result}
                        pathToShow={pathToShow}
                    />
                })
            }
        </div>
    )
}

interface BoardProps {
    setResult: (result: Map<number, WordResult>) => void
    pathToShow: number | null
}

function Board(props: BoardProps) {
    const initMap: Map<number, string> = new Map()
    const refMap: Map<number, RefObject<InputRef>> = new Map()
    for (var idx of boardUtil.indices()) {
        const ord = boardUtil.indexToOrder(idx)
        initMap.set(ord, "")
        refMap.set(ord, useRef<InputRef>(null))
    }
    const [values, setValues] = useState(new Map(initMap))
    const [numSwap, setNumSwap] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [dlIndex, setDlIndex] = useState<number | null>(null)
    const [tlIndex, setTlIndex] = useState<number | null>(null)
    const [dwIndex, setDwIndex] = useState<number | null>(null)
    const [dlIndexVisible, setDlIndexVisible] = useState(false)
    const [tlIndexVisible, setTlIndexVisible] = useState(false)
    const [dwIndexVisible, setDwIndexVisible] = useState(false)
    const [analyzeReady, setAnalyzeReady] = useState(false)
    const [progress, setProgress] = useState(0)
    const [curRes, setCurRes] = useState<Map<number, WordResult>>(new Map())
    const {setResult, pathToShow} = props

    const handleChange = (value: string, index: number) => {
        setValues(v => {
            v.set(index, value)
            return new Map(v)
        })
    }

    const keepFocus = () => {
        if (selectedIndex != null) {
            refMap.get(selectedIndex)?.current?.focus()
        }
    }

    const handleSetDlIndex = () => {
        keepFocus()
        setDlIndex(selectedIndex)
        setDlIndexVisible(true)
    }

    const handleResetDlIndex = () => {
        keepFocus()
        setDlIndexVisible(false)
    }

    const handleSetTlIndex = () => {
        keepFocus()
        setTlIndex(selectedIndex)
        setTlIndexVisible(true)
    }

    const handleResetTlIndex = () => {
        keepFocus()
        setTlIndexVisible(false)
    }

    const handleSetDwIndex = () => {
        keepFocus()
        setDwIndex(selectedIndex)
        setDwIndexVisible(true)
    }

    const handleResetDwIndex = () => {
        keepFocus()
        setDwIndexVisible(false)
    }

    const markerPosition = (index: number | null) => {
        const [row, col] = boardUtil.orderToIndex(index ?? 0)
        return {
            top: row * 40,
            left: col * 50,
        }
    }

    const analyze = async () => {
        const bd = boardUtil.create(values)
        bd.dlIndex = dlIndex
        bd.tlIndex = tlIndex
        bd.dwIndex = dwIndex
        bestWord(bd, numSwap, setProgress).then(res => {
            setResult(res)
            setCurRes(res)
            setProgress(100)
        })
    }

    useEffect(() => {
        setAnalyzeReady(boardUtil.isFulfilled(values))
    }, [values])

    return (
        <div id="board">
            <div className="board-wrapper">
                {dlIndexVisible ? <span className="marker" style={{ ...markerPosition(dlIndex), zIndex: 100, backgroundColor: "#8080E0" }}>DL</span> : null}
                {tlIndexVisible ? <span className="marker" style={{ ...markerPosition(tlIndex), zIndex: 101, backgroundColor: "#F07070" }}>TL</span> : null}
                {dwIndexVisible ? <span className="marker" style={{ ...markerPosition(dwIndex), zIndex: 102, backgroundColor: "#D070D0" }}>DW</span> : null}
                {[...new Array(5).keys()].map(
                    r => <LetterInputRow 
                        row={r}
                        onChange={handleChange}
                        refs={refMap}
                        setSelectedIndex={setSelectedIndex}
                        result={curRes}
                        pathToShow={pathToShow}
                    />
                )}
            </div>
            <Row justify={"space-evenly"}>
                <Col>
                    <div className="letter-option-row">
                        <Typography className="letter-option-name">DL:</Typography>
                        <Button 
                            type="primary"
                            className="letter-option-button"
                            tabIndex={-1}
                            onClick={handleSetDlIndex}
                        >
                            Set
                        </Button>
                        <Button 
                            className="letter-option-button"
                            tabIndex={-1}
                            onClick={handleResetDlIndex}
                        >
                            Reset
                        </Button>
                    </div>
                    <div className="letter-option-row">
                        <Typography className="letter-option-name">TL:</Typography>
                        <Button 
                            type="primary"
                            className="letter-option-button"
                            tabIndex={-1}
                            onClick={handleSetTlIndex}
                        >
                            Set
                        </Button>
                        <Button 
                            className="letter-option-button"
                            tabIndex={-1}
                            onClick={handleResetTlIndex}
                        >
                            Reset
                        </Button>
                    </div>
                    <div className="letter-option-row">
                        <Typography className="letter-option-name">DW:</Typography>
                        <Button 
                            type="primary"
                            className="letter-option-button"
                            tabIndex={-1}
                            onClick={handleSetDwIndex}
                        >
                            Set
                        </Button>
                        <Button 
                            className="letter-option-button"
                            tabIndex={-1}
                            onClick={handleResetDwIndex}
                        >
                            Reset
                        </Button>
                    </div>
                </Col>
                <Col>
                    <div className="letter-option-row">
                        <Typography className="letter-option-name">Swaps:</Typography>
                        <Select 
                            value={numSwap}
                            tabIndex={-1}
                            options={[
                                { value: 0, label: "0" },
                                { value: 1, label: "1" },
                                { value: 2, label: "2" },
                                { value: 3, label: "3" },
                            ]}
                            onChange={setNumSwap}
                        />
                    </div>
                </Col>
            </Row>
            <div className="analyze-container">
                <Button 
                    type="primary" 
                    style={{ marginRight: 20 }}
                    tabIndex={-1}
                    disabled={!analyzeReady}
                    onClick={analyze}
                >
                    💡Analyze!
                </Button>
                <Progress 
                    style={{ width: 200 }} 
                    percent={progress}
                    trailColor={"#bbbbbb"}
                />
            </div>
            <Typography style={{ marginTop: 10 }}>
                NOTE: It may take a long time if "swaps" is greater than 1
            </Typography>
        </div>
    )
}

export default Board