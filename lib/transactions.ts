import raw from "../data/transactions.json"

export type Transaction = {
    id: string
    date: string
    description: string
    amount: number
    status: string
    method?: string
    customer?: string
}

// If you need an expense-only version for the "all" tab, define a separate type.
export type ExpenseTransaction = {
    id: string
    date: string
    description: string
    amount: number
    category: string
    status?: string
}

const transactions: Transaction[] = raw as Transaction[]

/**
 * Return all transactions stored in the CMS (a simple JSON file for this demo).
 */
export function getTransactions(): Transaction[] {
    return transactions
}

export function getTransactionById(id: string): Transaction | undefined {
    return transactions.find((t) => t.id === id)
}

export function getIncomeTransactions(): Transaction[] {
    return transactions.filter((t) => t.amount > 0 && t.status !== "refunded")
}

// In the original page the "expenses" tab is driven by a hard‑coded list,
// not the transactions array.  If you want to keep that behaviour you can
// either extend the JSON or keep the static array in the component.  Here
// we export a helper that converts negative‑amount transactions into a
// simplified expense model for reuse:
export function getExpenseTransactions(): ExpenseTransaction[] {
    return transactions
        .filter((t) => t.amount < 0)
        .map((t) => ({
            id: t.id,
            date: t.date,
            description: t.description,
            amount: t.amount,
            category: "General",
            status: t.status,
        }))
}
