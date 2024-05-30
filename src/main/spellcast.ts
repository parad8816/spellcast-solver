import { Board, Index } from "./board"
import words from "./words.json"

const letterPoints = new Map([
    ["a", 1],
    ["b", 4],
    ["c", 5],
    ["d", 3],
    ["e", 1],
    ["f", 5],
    ["g", 3],
    ["h", 4],
    ["i", 1],
    ["j", 7],
    ["k", 6],
    ["l", 3],
    ["m", 4],
    ["n", 2],
    ["o", 1],
    ["p", 4],
    ["q", 8],
    ["r", 2],
    ["s", 2],
    ["t", 2],
    ["u", 4],
    ["v", 5],
    ["w", 5],
    ["x", 7],
    ["y", 4],
    ["z", 8],
])

const longWordBonus = 10
const longWordMinLength = 6

type WordSearchResult = {
    word: string,
    point: number,
    numSkipped: number,
    path: number[]
}

type PathSearchResult = {
    numSkipped: number,
    path: number[]
}

class WordResult {
    word: string
    point: number
    numSwap: number
    path: number[]

    constructor(
        word: string, 
        point: number, 
        numSwap: number,
        path: number[]
    ) {
        this.word = word
        this.point = point
        this.numSwap = numSwap
        this.path = path
    }

    toString(): string {
        return `${this.word.toUpperCase()} (${this.point})`
    }
}

async function bestWord(
    board: Board, 
    numSkippable: number,
    setProgress: (value: number) => void
): Promise<Map<number, WordResult>> {
    console.log(board)
    const size = words.length
    var curMap = new Map<number, WordSearchResult>()
    for (var i = 0; i < size; i++) {
        const w = words[i]
        var outS = w
        const paths = findPaths(board, w, numSkippable)
        if (paths.length > 0) {
            outS += " ... <found>"
            for (const p of paths) {
                const pt = wordPoint(board, w, p.path)
                const old = curMap.get(p.numSkipped)
                if (old === undefined || pt > old.point) {
                    const cur = {
                        word: w,
                        point: pt,
                        numSkipped: p.numSkipped,
                        path: p.path
                    }
                    curMap.set(p.numSkipped, cur)
                }
            }
        }
        //console.log(outS)
        setProgress(i / size)
    }
    var mp = new Map<number, WordResult>()
    curMap.forEach((v, k) => mp.set(k, new WordResult(v.word, v.point, v.numSkipped, v.path)))
    return mp
}

function wordPoint(
    board: Board,
    word: string,
    path: number[]
): number {
    var sum = 0
    var dwFlg = false
    for (var i = 0; i < path.length; i++) {
        const l = word[i]
        const ord = path[i]
        if (ord == board.dwIndex) dwFlg = true
        var lpt = letterPoints.get(l) ?? 0
        if (ord == board.dlIndex) lpt *= 2
        if (ord == board.tlIndex) lpt *= 3
        sum += lpt
    }
    if (dwFlg) sum *= 2
    if (word.length >= longWordMinLength) sum += longWordBonus
    return sum
}

function findPaths(
    board: Board,
    word: string,
    numSkippable: number
): PathSearchResult[] {
    const arr = board.util.indices().map(idx => findPathsFrom(board, idx, word, numSkippable))
    const arrFlatten = arr.reduce((acc, val) => acc.concat(val), [])
    return arrFlatten
}

function findPathsFrom(
    board: Board, 
    start: Index, 
    word: string, 
    numSkippable: number
): PathSearchResult[] {
    return findPathsFromRec(board, start, word, numSkippable, 0, [])
}

function findPathsFromRec(
    board: Board, 
    start: Index, 
    remainingStr: string, 
    numSkippable: number, 
    numSkipped: number, 
    path: number[]
): PathSearchResult[] {
    const startOrd = board.util.indexToOrder(start)

    // 開始地点が既に通った文字と被っていたら中止
    if (path.includes(startOrd)) {
        return []
    }

    const bls = board.letters
    const [row, col] = start
    const l = remainingStr[0]
    const rem = remainingStr.slice(1)

    var numSkippable1 = numSkippable
    var numSkipped1 = numSkipped
    if (bls.get(startOrd) != l) {
        numSkippable1--; numSkipped1++;
    }

    // スキップ可能な回数を超過した
    if (numSkippable1 < 0) {
        return []
    }

    const path1 = [...path, startOrd]

    // 残りの文字なし (道発見)
    if (rem.length == 0) {
        return [{
            numSkipped: numSkipped1,
            path: path1
        }]
    }

    var arr: PathSearchResult[] = []
    var tmp: PathSearchResult[] = []

    // 8方向に移って調べる
    if (row > 0) {
        tmp = findPathsFromRec(board, [row - 1, col], rem, numSkippable1, numSkipped1, path1)
        arr = [...arr, ...tmp]
        if (col > 0) {
            tmp = findPathsFromRec(board, [row - 1, col - 1], rem, numSkippable1, numSkipped1, path1)
            arr = [...arr, ...tmp]
        }
        if (col < board.colCount - 1) {
            tmp = findPathsFromRec(board, [row - 1, col + 1], rem, numSkippable1, numSkipped1, path1)
            arr = [...arr, ...tmp]
        }
    }
    if (row < board.rowCount - 1) {
        tmp = findPathsFromRec(board, [row + 1, col], rem, numSkippable1, numSkipped1, path1)
        arr = [...arr, ...tmp]
        if (col > 0) {
            tmp = findPathsFromRec(board, [row + 1, col - 1], rem, numSkippable1, numSkipped1, path1)
            arr = [...arr, ...tmp]
        }
        if (col < board.colCount - 1) {
            tmp = findPathsFromRec(board, [row + 1, col + 1], rem, numSkippable1, numSkipped1, path1)
            arr = [...arr, ...tmp]
        }
    }
    if (col > 0) {
        tmp = findPathsFromRec(board, [row, col - 1], rem, numSkippable1, numSkipped1, path1)
        arr = [...arr, ...tmp]
    }
    if (col < board.colCount - 1) {
        tmp = findPathsFromRec(board, [row, col + 1], rem, numSkippable1, numSkipped1, path1)
        arr = [...arr, ...tmp]
    }
    return arr
}

export {
    WordResult,
    bestWord
}