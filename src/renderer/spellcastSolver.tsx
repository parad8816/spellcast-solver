import React, { RefObject, useEffect, useRef, useState } from "react";
import { Button, Col, Divider, Input, InputRef, Row, Select, Spin, Typography } from "antd";
import { WordResult, WordResultMap, bestWord } from "../main/spellcast";
import { BoardUtil } from "../main/board";

function SpellcastSolver() {
    const boardUtil = new BoardUtil(5, 5)
    const initMap: Map<number, string> = new Map()
    const refMap: Map<number, RefObject<InputRef>> = new Map()
    for (var idx of boardUtil.indices()) {
        const ord = boardUtil.indexToOrder(idx)
        initMap.set(ord, "")
        refMap.set(ord, useRef<InputRef>(null))
    }

    const [values, setValues] = useState(new Map(initMap))
    const [resultMap, setResultMap] = useState<WordResultMap>(new Map())
    const [result, setResult] = useState<WordResult | null>(null)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const [numSwap, setNumSwap] = useState(0)
    const [dlIndex, setDlIndex] = useState<number | null>(null)
    const [tlIndex, setTlIndex] = useState<number | null>(null)
    const [dwIndex, setDwIndex] = useState<number | null>(null)
    const [dlIndexVisible, setDlIndexVisible] = useState(false)
    const [tlIndexVisible, setTlIndexVisible] = useState(false)
    const [dwIndexVisible, setDwIndexVisible] = useState(false)
    const [analyzeReady, setAnalyzeReady] = useState(false)
    const [progress, setProgress] = useState(0)
    const [analyzing, setAnalyzing] = useState(false)

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
        setAnalyzing(true)
        const resMap = await bestWord(bd, numSwap, setProgress, 1000)
        setResultMap(resMap)
        setProgress(100)
        setAnalyzing(false)
    }

    useEffect(() => {
        setAnalyzeReady(boardUtil.isFulfilled(values))
    }, [values])

    const handleChangeBoardLetter = (value: string, index: number) => {
        setValues(v => {
            v.set(index, value)
            return new Map(v)
        })
    }
    
    const letterInput = (index: number) => {
        const [realVal, setRealVal] = useState("")
    
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value
            const reg = /^[A-Za-z]$/
            if (reg.test(inputValue) || inputValue === '') {
                setRealVal(inputValue.toUpperCase())
                handleChangeBoardLetter(inputValue.toLowerCase(), index)
                if (inputValue !== '') {
                    const next = refMap.get(index + 1)
                    if (next !== undefined) {
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
            <span style={{ position: "relative" }}>
                <Input
                    style={result != null && result.path.includes(index) ? { background: "#FFF499" } : {}}
                    className="letter-input"
                    maxLength={1}
                    tabIndex={index}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={realVal}
                    ref={refMap.get(index)}
                />
                {result != null && result.swapped.has(index) ? <span 
                    className="letter-replacer" 
                    style={{ top: -13, left: 35, zIndex: 99 }}
                >
                    {result.swapped.get(index)?.toUpperCase()}
                </span> : null}
            </span>
        )
    }
    
    const letterInputRow = (row: number) => {
        return (
            <div className="letter-input-row">
                {[...new Array(5).keys()].map(
                    c => {
                        const ord = boardUtil.indexToOrder([row, c])
                        return letterInput(ord)
                    })
                }
            </div>
        )
    }
    
    const board = (
        <div id="board">
            <div className="board-wrapper">
                {dlIndexVisible ? <span className="marker" style={{ ...markerPosition(dlIndex), zIndex: 100, backgroundColor: "#8080E0" }}>DL</span> : null}
                {tlIndexVisible ? <span className="marker" style={{ ...markerPosition(tlIndex), zIndex: 101, backgroundColor: "#F07070" }}>TL</span> : null}
                {dwIndexVisible ? <span className="marker" style={{ ...markerPosition(dwIndex), zIndex: 102, backgroundColor: "#D070D0" }}>DW</span> : null}
                {[...new Array(5).keys()].map(r => letterInputRow(r))}
            </div>
            <Row justify={"space-evenly"}>
                <Col style={{ width: 220 }}>
                    <Row align={"middle"} justify={"center"} className="letter-option-row">
                        <Col flex={"60px"}>
                            <Typography className="letter-option-name">DL:</Typography>
                        </Col>
                        <Col>
                            <Button 
                                type="primary"
                                className="letter-option-button"
                                tabIndex={-1}
                                onClick={handleSetDlIndex}
                            >
                                Set
                            </Button>
                        </Col>
                        <Col>
                            <Button 
                                className="letter-option-button"
                                tabIndex={-1}
                                onClick={handleResetDlIndex}
                            >
                                Reset
                            </Button>
                        </Col>
                    </Row>
                    <Row align={"middle"} justify={"center"} className="letter-option-row">
                        <Col flex={"60px"}>
                            <Typography className="letter-option-name">TL:</Typography>
                        </Col>
                        <Col>
                            <Button 
                                type="primary"
                                className="letter-option-button"
                                tabIndex={-1}
                                onClick={handleSetTlIndex}
                            >
                                Set
                            </Button>
                        </Col>
                        <Col>
                            <Button 
                                className="letter-option-button"
                                tabIndex={-1}
                                onClick={handleResetTlIndex}
                            >
                                Reset
                            </Button>
                        </Col>
                    </Row>
                    <Row align={"middle"} justify={"center"} className="letter-option-row">
                        <Col flex={"60px"}>
                            <Typography className="letter-option-name">DW:</Typography>
                        </Col>
                        <Col>
                            <Button 
                                type="primary"
                                className="letter-option-button"
                                tabIndex={-1}
                                onClick={handleSetDwIndex}
                            >
                                Set
                            </Button>
                        </Col>
                        <Col>
                            <Button 
                                className="letter-option-button"
                                tabIndex={-1}
                                onClick={handleResetDwIndex}
                            >
                                Reset
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col style={{ width: 140 }}>
                    <Row className="letter-option-row">
                        <Col flex={"72px"}>
                            <Typography className="letter-option-name">Swaps:</Typography>
                        </Col>
                        <Col>
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
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="analyze-container">
                <Button 
                    type="primary" 
                    style={{ width: 120 }}
                    tabIndex={-1}
                    disabled={!analyzeReady}
                    onClick={analyze}
                >
                    💡Analyze!
                </Button>
                <Spin 
                    tip={`${progress}%`} 
                    spinning={analyzing}
                    size="large"
                    fullscreen 
                />
            </div>
            <Typography style={{ marginTop: 10 }}>
                NOTE: It may take a long time if "swaps" is greater than 1
            </Typography>
        </div>
    )

    const setResultOfSwap = (numSwap: number | null) => {
        if (numSwap != null) {
            const res = resultMap.get(numSwap) ?? null
            setResult(res)
        } else {
            setResult(null)
        }
    }
    
    const boardResult = (
        <div id="board-result">
            <div className="word-result-container">
                <div className="text-name-container">
                    <Button 
                        className="text-name-button"
                        tabIndex={-1}
                        disabled={resultMap.get(0) === undefined}
                        onClick={() => setResultOfSwap(0)}
                    >
                        ◀️
                    </Button>
                    <Typography className="text-name">No Swap:</Typography>
                </div>
                <Typography className="text-word">{resultMap.get(0)?.toString() ?? "---"}</Typography>
            </div>
            <div className="word-result-container">
                <div className="text-name-container">
                    <Button 
                        className="text-name-button"
                        tabIndex={-1}
                        disabled={resultMap.get(1) === undefined}
                        onClick={() => setResultOfSwap(1)}
                    >
                        ◀️
                    </Button>
                    <Typography className="text-name">1 Swap:</Typography>
                </div>
                <Typography className="text-word">{resultMap.get(1)?.toString() ?? "---"}</Typography>
            </div>
            <div className="word-result-container">
                <div className="text-name-container">
                    <Button
                        className="text-name-button"
                        tabIndex={-1}
                        disabled={resultMap.get(2) === undefined}
                        onClick={() => setResultOfSwap(2)}
                    >
                        ◀️
                    </Button>
                    <Typography className="text-name">2 Swaps:</Typography>
                </div>
                <Typography className="text-word">{resultMap.get(2)?.toString() ?? "---"}</Typography>
            </div>
            <div className="word-result-container">
                <div className="text-name-container">
                    <Button 
                        className="text-name-button"
                        tabIndex={-1}
                        disabled={resultMap.get(3) === undefined}
                        onClick={() => setResultOfSwap(3)}
                    >
                        ◀️
                    </Button>
                    <Typography className="text-name">3 Swaps:</Typography>
                </div>
                <Typography className="text-word">{resultMap.get(3)?.toString() ?? "---"}</Typography>
            </div>
            <Button 
                style={{ width: 150 }}
                tabIndex={-1}
                onClick={() => setResultOfSwap(null)}
            >
                🚫Disable Path
            </Button>
        </div>
    )

    return (
        <Row id='solver'>
            <Col flex={2}>{board}</Col>
            <Divider type='vertical' className='divider' />
            <Col flex={2}>{boardResult}</Col>
        </Row>
    )
}

export default SpellcastSolver