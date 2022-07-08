import { createContext, useCallback, useContext } from "react";
import { useAsyncStorageState } from "../hooks/useAsyncStorageState";
import { TransactionInStorage } from "../screens/Dashboard";
import { transactionsStorageKey } from "../utils/constants";
import { useAuthContext } from "./AuthContext";

interface TransactionsContextData {
  transactions: TransactionInStorage[];
  isTransactionsLoading: boolean;
  addTransaction: (transaction: TransactionInStorage) => void;
  deleteTransaction: (id: TransactionInStorage["id"]) => void;
}

const TransactionsContext = createContext({} as TransactionsContextData);

export const useTransactionsContext = () => useContext(TransactionsContext);

interface TransactionsContextProviderProps {
  children: React.ReactNode;
}

export const TransactionsContextProvider: React.FC<
  TransactionsContextProviderProps
> = ({ children }) => {
  const { user } = useAuthContext();
  const [transactions, setTransactions, isTransactionsLoading] =
    useAsyncStorageState<TransactionInStorage[]>(
      `${transactionsStorageKey}_user:${user!.id}`,
      [],
    );

  const addTransaction: TransactionsContextData["addTransaction"] = useCallback(
    newTransaction => {
      setTransactions(transactions => [...transactions, newTransaction]);
    },
    [],
  );

  const deleteTransaction: TransactionsContextData["deleteTransaction"] =
    useCallback(transactionId => {
      setTransactions(transactions => {
        return transactions.filter(
          transaction => transaction.id !== transactionId,
        );
      });
    }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        isTransactionsLoading,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
