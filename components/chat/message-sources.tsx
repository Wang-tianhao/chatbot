"use client";

import { ChevronDownIcon, GlobeIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { GroundingSource } from "@/lib/types";

const hostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const sourceLabel = (source: GroundingSource) =>
  source.title?.trim() ? source.title : hostname(source.url);

/**
 * Renders the web sources a grounded answer relied on as a collapsible
 * "Sources" panel. Each entry shows the source name and a snippet of the
 * answer text it grounded (its summary). Built from `data-sources` parts the
 * server derives from Gemini grounding metadata.
 */
export const MessageSources = ({ sources }: { sources: GroundingSource[] }) => {
  if (sources.length === 0) {
    return null;
  }

  return (
    <Collapsible
      className="group not-prose w-[min(100%,520px)] rounded-md border"
      defaultOpen={true}
    >
      <CollapsibleTrigger className="flex w-full items-center gap-2 px-4 py-2.5 text-muted-foreground text-sm transition-colors hover:text-foreground">
        <GlobeIcon className="size-4" />
        <span className="font-medium">
          {sources.length} {sources.length === 1 ? "source" : "sources"}
        </span>
        <ChevronDownIcon className="ml-auto size-4 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ol className="flex flex-col divide-y border-t">
          {sources.map((source, index) => (
            <li className="flex gap-3 px-4 py-3 text-sm" key={source.url}>
              <span className="shrink-0 text-muted-foreground tabular-nums">
                {index + 1}.
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <a
                  className="font-medium text-foreground underline-offset-2 hover:underline"
                  href={source.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="line-clamp-1 break-all">
                    {sourceLabel(source)}
                  </span>
                </a>
                {source.snippet && (
                  <p className="line-clamp-3 text-muted-foreground text-xs leading-relaxed">
                    {source.snippet}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </CollapsibleContent>
    </Collapsible>
  );
};
