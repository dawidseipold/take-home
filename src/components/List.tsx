import { FC } from "react";
import { ListItem } from "../api/getListData";
import { ExpandButton, ToggleButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import { cn } from "../utils/cn";
import { useCardStore } from "../utils/stores/card";

type CardProps = {
  cardId: ListItem["id"];
};

export const Card: FC<CardProps> = ({ cardId }) => {
  const { cards, toggleCardExpansion, toggleCardDeletion } = useCardStore();
  const card = cards.find(c => c.id === cardId);

  if (!card) return null

  return (
    <article className="flex flex-col gap-y-2 border border-black px-2 py-2">
      <header className="flex items-center justify-between">
        <h1 className="font-medium">{card.title}</h1>

        <nav className="flex gap-1 items-center">
          <ExpandButton expanded={card.expanded ?? false} onClick={() => toggleCardExpansion(card.id)} >
            <ChevronUpIcon />
          </ExpandButton>

          <ToggleButton toggled={card.deleted ?? false} onClick={() => toggleCardDeletion(card.id)} />
        </nav>
      </header>

      <p className={cn("text-sm", !card.expanded ? "hidden" : "flex")}>{card.description}</p>
    </article>
  );
};
