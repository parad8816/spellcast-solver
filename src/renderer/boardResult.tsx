import Typography from "antd/es/typography/Typography"
import { WordResult } from "../main/spellcast"
import { Button } from "antd"

interface BoardResultProps {
    result: Map<number, WordResult>
    reflectPath: (numSwap: number | null) => void
}

function BoardResult(props: BoardResultProps) {
    const {result, reflectPath} = props

    return (
        <div id="board-result">
            <div className="word-result-container">
                <div className="text-name-container">
                    <Button 
                        className="text-name-button"
                        disabled={result.get(0) === undefined}
                        onClick={() => reflectPath(0)}
                    >
                        ◀️
                    </Button>
                    <Typography className="text-name">No Swap:</Typography>
                </div>
                <Typography className="text-word">{result.get(0)?.toString() ?? "---"}</Typography>
            </div>
            <div className="word-result-container">
                <div className="text-name-container">
                    <Button 
                        className="text-name-button"
                        disabled={result.get(1) === undefined}
                        onClick={() => reflectPath(1)}
                    >
                        ◀️
                    </Button>
                    <Typography className="text-name">1 Swap:</Typography>
                </div>
                <Typography className="text-word">{result.get(1)?.toString() ?? "---"}</Typography>
            </div>
            <div className="word-result-container">
                <div className="text-name-container">
                    <Button
                        className="text-name-button"
                        disabled={result.get(2) === undefined}
                        onClick={() => reflectPath(2)}
                    >
                        ◀️
                    </Button>
                    <Typography className="text-name">2 Swaps:</Typography>
                </div>
                <Typography className="text-word">{result.get(2)?.toString() ?? "---"}</Typography>
            </div>
            <div className="word-result-container">
                <div className="text-name-container">
                    <Button 
                        className="text-name-button"
                        disabled={result.get(3) === undefined}
                        onClick={() => reflectPath(3)}
                    >
                        ◀️
                    </Button>
                    <Typography className="text-name">3 Swaps:</Typography>
                </div>
                <Typography className="text-word">{result.get(3)?.toString() ?? "---"}</Typography>
            </div>
            <Button 
                style={{ width: 150 }}
                onClick={() => reflectPath(null)}
            >
                🚫Disable Path
            </Button>
        </div>
    )
}

export default BoardResult