import { Markdown } from "@tanstack/markdown/react";
import { useEvent } from "@reactuses/core";
import { cn } from "cn";
import { ChevronDown, EllipsisVertical } from "lucide-react";
import { type ReactNode, useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";
import { highlightMarkdownCode } from "@/shared/ui/highlight-markdown";
import { VirtualList } from "@/shared/ui/virtual-list";
import { Button } from "@/shared/ui-kit/components/ui/button";
import { Spinner } from "@/shared/ui-kit/components/ui/spinner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui-kit/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/ui-kit/components/ui/dropdown-menu";
import { Separator } from "@/shared/ui-kit/components/ui/separator";

type QuestionListItem = {
  id: number;
  body: string;
};

type QuestionListSlots = {
  actions: (question: QuestionListItem) => ReactNode;
  body?: (question: QuestionListItem, content: ReactNode) => ReactNode;
};

type QuestionListProps = {
  questions: readonly QuestionListItem[];
  empty: ReactNode;
  slots: QuestionListSlots;
};

type QuestionListRowProps = {
  question: QuestionListItem;
  index: number;
  isExpanded: boolean;
  onExpandedChange: (id: number, open: boolean) => void;
  slots: QuestionListSlots;
};

const COLLAPSED_QUESTION_CLASS =
  "question prose prose-xl max-w-none line-clamp-2 overflow-hidden prose-headings:my-0 prose-p:my-0 prose-pre:my-0 prose-ul:my-0 prose-ol:my-0 prose-blockquote:my-0";
const EXPANDED_QUESTION_CLASS =
  "question prose prose-xl max-w-none h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-150 ease-out data-starting-style:h-[2lh]";
const LAYOUT_SIZE_RETRY_FRAMES = 12;

function questionKey(question: QuestionListItem): number {
  return question.id;
}

function questionsLayoutKey(questions: readonly QuestionListItem[]): string {
  return questions.map((question) => String(question.id)).join("\0");
}

function setExpandedId(
  current: ReadonlySet<number>,
  id: number,
  open: boolean,
): ReadonlySet<number> {
  const next = new Set(current);

  if (open) {
    next.add(id);
  } else {
    next.delete(id);
  }

  return next;
}

const FALLBACK_LINE_HEIGHT_PX = 36;
const TWO_LINE_BUDGET_TOLERANCE_PX = 1;

function readTwoLineBudgetPx(element: HTMLElement): number {
  const styles = getComputedStyle(element);
  const fontSize = Number.parseFloat(styles.fontSize);
  const parsedLineHeight = Number.parseFloat(styles.lineHeight);
  const lineHeight = Number.isFinite(parsedLineHeight)
    ? parsedLineHeight
    : Number.isFinite(fontSize)
      ? fontSize * 1.8
      : FALLBACK_LINE_HEIGHT_PX;

  return lineHeight * 2;
}

function measureCollapsedContentHeight(element: HTMLElement, width: number): number {
  const probe = element.cloneNode(true) as HTMLElement;
  probe.classList.remove("line-clamp-2", "overflow-hidden");
  probe.style.cssText = [
    "position:fixed",
    "left:0",
    "top:0",
    "visibility:hidden",
    "pointer-events:none",
    `width:${String(width)}px`,
    "height:auto",
    "max-height:none",
    "overflow:visible",
    "display:block",
    "-webkit-line-clamp:unset",
    "line-clamp:unset",
  ].join(";");

  for (const block of probe.querySelectorAll("p, pre, ul, ol, h1, h2, h3, blockquote, li")) {
    if (block instanceof HTMLElement) {
      block.style.margin = "0";
    }
  }

  element.insertAdjacentElement("afterend", probe);
  const height = probe.offsetHeight;
  probe.remove();

  return height;
}

function collapsedQuestionOverflows(element: HTMLElement): boolean {
  const width = element.clientWidth;

  if (width <= 0) return false;

  return (
    measureCollapsedContentHeight(element, width) >
    readTwoLineBudgetPx(element) + TWO_LINE_BUDGET_TOLERANCE_PX
  );
}

function questionBodyLikelyOverflows(body: string): boolean {
  const trimmed = body.trim();
  const blocks = trimmed.split(/\n+/).filter((block) => block.length > 0);

  return blocks.length > 2 || trimmed.length > 160;
}

function useCollapsedOverflow(
  isCollapsed: boolean,
  body: string,
): {
  ref: (element: HTMLDivElement | null) => void;
  overflows: boolean;
} {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [overflows, setOverflows] = useState(() => questionBodyLikelyOverflows(body));

  useLayoutEffect(() => {
    if (!isCollapsed || element === null) return;

    let attempts = 0;
    let frame = 0;

    const updateOverflow = (): void => {
      if (element.clientWidth <= 0 && attempts < LAYOUT_SIZE_RETRY_FRAMES) {
        attempts += 1;
        frame = requestAnimationFrame(updateOverflow);
        return;
      }

      setOverflows(collapsedQuestionOverflows(element));
    };

    updateOverflow();

    const resizeObserver = new ResizeObserver(updateOverflow);
    resizeObserver.observe(element);

    const mutationObserver = new MutationObserver(updateOverflow);
    mutationObserver.observe(element, { childList: true, subtree: true, characterData: true });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [element, isCollapsed]);

  return { ref: setElement, overflows };
}

function subscribeNever(): () => void {
  return () => {};
}

function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

function useQuestionListLayoutReady(questions: readonly QuestionListItem[]): boolean {
  const layoutKey = questionsLayoutKey(questions);
  const isEmpty = questions.length === 0;
  const isClient = useIsClient();
  const [readyKey, setReadyKey] = useState<string | null>(null);

  if (isEmpty && readyKey !== layoutKey) {
    setReadyKey(layoutKey);
  }

  useLayoutEffect(() => {
    if (isEmpty) return;

    const frame = requestAnimationFrame(() => {
      setReadyKey(layoutKey);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [isEmpty, layoutKey]);

  useEffect(() => {
    if (isEmpty) return;

    const frame = requestAnimationFrame(() => {
      setReadyKey(layoutKey);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [isEmpty, layoutKey]);

  return isEmpty || !isClient || readyKey === layoutKey;
}

function QuestionListRow({
  question,
  index,
  isExpanded,
  onExpandedChange,
  slots,
}: QuestionListRowProps): ReactNode {
  const { ref: bodyRef, overflows } = useCollapsedOverflow(!isExpanded, question.body);
  const showToggle = isExpanded || overflows;

  const markdown = <Markdown highlighter={highlightMarkdownCode}>{question.body}</Markdown>;
  const content = isExpanded ? (
    <CollapsibleContent className={EXPANDED_QUESTION_CLASS}>{markdown}</CollapsibleContent>
  ) : (
    <div ref={bodyRef} className={COLLAPSED_QUESTION_CLASS}>
      {markdown}
    </div>
  );

  const handleOpenChange = useEvent((open: boolean) => {
    onExpandedChange(question.id, open);
  });

  return (
    <>
      {index > 0 ? <Separator /> : null}
      <Collapsible open={isExpanded} onOpenChange={handleOpenChange}>
        <article
          className={cn(
            "group flex min-h-[121px] items-start py-4",
            !isExpanded && "h-[121px] overflow-hidden",
          )}
        >
          <div className="min-w-0 flex-1">
            {slots.body ? slots.body(question, content) : content}
          </div>
          <div
            className={cn("relative flex shrink-0 items-center self-stretch", showToggle && "px-7")}
          >
            {showToggle ? (
              <CollapsibleTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={isExpanded ? "Collapse question" : "Show full question"}
                  />
                }
              >
                <ChevronDown
                  data-icon="inline-start"
                  className="group-data-panel-open/button:rotate-180"
                />
              </CollapsibleTrigger>
            ) : null}
            <div
              className={cn(
                showToggle && "absolute inset-y-0 right-0 flex items-center",
                "pointer-events-none opacity-0",
                "group-hover:pointer-events-auto group-hover:opacity-100",
                "focus-within:pointer-events-auto focus-within:opacity-100",
                "has-data-popup-open:pointer-events-auto has-data-popup-open:opacity-100",
              )}
            >
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="ghost" size="icon-sm" aria-label="Question actions" />}
                >
                  <EllipsisVertical data-icon="inline-start" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>{slots.actions(question)}</DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </article>
      </Collapsible>
    </>
  );
}

export function QuestionList({ questions, empty, slots }: QuestionListProps): ReactNode {
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<number>>(() => new Set());
  const isReady = useQuestionListLayoutReady(questions);

  const handleExpandedChange = useEvent((id: number, open: boolean) => {
    setExpandedIds((current) => setExpandedId(current, id, open));
  });

  return (
    <div className="relative flex h-[70svh] w-[70vw] max-w-[1200px] flex-col" aria-busy={!isReady}>
      <VirtualList items={questions} getItemKey={questionKey} empty={empty}>
        {(question, index) => (
          <QuestionListRow
            question={question}
            index={index}
            isExpanded={expandedIds.has(question.id)}
            onExpandedChange={handleExpandedChange}
            slots={slots}
          />
        )}
      </VirtualList>
      {isReady ? null : (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
          <Spinner className="size-8" />
        </div>
      )}
    </div>
  );
}
