import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { useCardStore } from "../utils/stores/card";
import { TextButton } from "./Buttons";
import { cn } from "../utils/cn";

export const Entrypoint = () => {
  const [deletedRevealed, setDeletedRevealed] = useState(false);
  const { cards, initializeCards } = useCardStore();

  const listQuery = useGetListData();

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    initializeCards(listQuery.data ?? [])
  }, [listQuery.data, listQuery.isLoading, initializeCards]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  const visibleCards = cards.filter(card => card.isVisible && !card.deleted);
  const deletedCards = cards.filter(card => card.deleted);

  return (
    <div className="flex items-start justify-center w-full h-full gap-x-16 p-8">
      <div className="flex flex-col gap-y-4 w-full max-w-xl">
        <header className="flex justify-between">
          <h1 className="font-medium text-lg">My Awesome List ({visibleCards.length})</h1>

          <TextButton
            onClick={() => listQuery.refetch()}
            disabled={listQuery.isLoading}
          >
            Refresh
          </TextButton>
        </header>

        <div className={cn("flex flex-col gap-y-3 relative", listQuery.isFetching && "min-h-64")}>
          {listQuery.isFetching ? (
            <Spinner />
          ) :
            visibleCards.map((card) => (
              <Card key={card.id} cardId={card.id} />
            ))
          }
        </div>
      </div>

      <div className="flex flex-col gap-y-4 w-full max-w-xl">
        <header className="flex justify-between">
          <h1 className="font-medium text-lg">Deleted Cards ({deletedCards.length})</h1>

          <TextButton
            onClick={() => {
              setDeletedRevealed(prev => !prev)
            }}
            disabled={deletedCards.length <= 0}
          >
            {deletedRevealed ? "Hide" : "Reveal"}
          </TextButton>
        </header>

        {deletedRevealed && (
          <div className="flex flex-col gap-y-3">
            {deletedCards.map((card) => (
              <Card
                key={card.id}
                cardId={card.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
