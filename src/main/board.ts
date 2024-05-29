class Board {
    readonly rowCount: number
    readonly colCount: number
    readonly letters: ReadonlyMap<number, string>
    readonly util: BoardUtil
    dlIndex: number | null = null
    tlIndex: number | null = null
    dwIndex: number | null = null

    constructor(
        rowCount: number, 
        colCount: number, 
        letters: Map<number, string>
    ) {
        this.rowCount = rowCount
        this.colCount = colCount
        this.letters = letters
        this.util = new BoardUtil(rowCount, colCount)
    }
}

class BoardUtil {
    readonly rowCount: number
    readonly colCount: number

    constructor(
        rowCount: number, 
        colCount: number, 
    ) {
        this.rowCount = rowCount
        this.colCount = colCount
    }

    create(letters: Map<number, string>): Board {
        return new Board(this.rowCount, this.colCount, letters)
    }

    indices(): Index[] {
        var arr: Index[] = []
        for (var i = 0; i < this.rowCount; i++) {
            for (var j = 0; j < this.colCount; j++) {
                arr = [...arr, [i, j]]
            }
        }
        return arr
    }

    indexToOrder(index: Index): number {
        const [r, c] = index
        return r * this.colCount + c
    }

    orderToIndex(order: number): Index {
        const rem = order % this.colCount
        const div = (order - rem) / this.colCount
        return [div, rem]
    }

    isFulfilled(letters: Map<number, string>): boolean {
        for (const idx of this.indices()) {
            const ord = this.indexToOrder(idx)
            const l = letters.get(ord)
            if (l === '' || l === undefined) {
                return false
            }
        }
        return true
    }
}

type Index = [number, number]

export {
    Board,
    BoardUtil,
    Index
}